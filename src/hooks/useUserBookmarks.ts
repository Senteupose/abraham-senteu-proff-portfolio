import { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, setDoc, deleteDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { ProjectCaseStudy } from '../data/portfolioData';

export function useUserBookmarks() {
  const { currentUser } = useAuth();
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setBookmarkedIds(new Set());
      return;
    }

    setLoading(true);
    const bookmarksPath = `users/${currentUser.uid}/bookmarks`;
    const bookmarksCol = collection(db, 'users', currentUser.uid, 'bookmarks');

    const unsubscribe = onSnapshot(
      bookmarksCol,
      (snapshot) => {
        const ids = new Set<string>();
        snapshot.forEach((docSnap) => {
          ids.add(docSnap.id);
        });
        setBookmarkedIds(ids);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        handleFirestoreError(error, OperationType.GET, bookmarksPath);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const toggleBookmark = async (project: ProjectCaseStudy) => {
    if (!currentUser) {
      return { success: false, reason: 'auth_required' };
    }

    const bookmarkDocRef = doc(db, 'users', currentUser.uid, 'bookmarks', project.id);
    const isSaved = bookmarkedIds.has(project.id);

    try {
      if (isSaved) {
        await deleteDoc(bookmarkDocRef);
      } else {
        await setDoc(bookmarkDocRef, {
          id: project.id,
          userId: currentUser.uid,
          projectId: project.id,
          projectTitle: project.title,
          category: project.category,
          notes: '',
          createdAt: new Date().toISOString(),
        });
      }
      return { success: true, saved: !isSaved };
    } catch (error) {
      handleFirestoreError(
        error,
        isSaved ? OperationType.DELETE : OperationType.CREATE,
        `users/${currentUser.uid}/bookmarks/${project.id}`
      );
      return { success: false, reason: 'firestore_error' };
    }
  };

  const isBookmarked = (projectId: string) => bookmarkedIds.has(projectId);

  return {
    bookmarkedIds,
    toggleBookmark,
    isBookmarked,
    loading,
    count: bookmarkedIds.size,
  };
}
