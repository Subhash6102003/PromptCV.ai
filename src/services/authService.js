import { 
  signInWithGoogle, 
  signOutUser, 
  onAuthStateChange,
  auth,
  db 
} from '@/config/firebase'
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore'

class AuthService {
  constructor() {
    this.user = null
    this.isAuthenticated = false
    this.loading = true
    this.listeners = []
  }

  // Initialize auth state listener
  init() {
    return new Promise((resolve) => {
      onAuthStateChange(async (user) => {
        this.loading = false
        
        if (user) {
          this.user = user
          this.isAuthenticated = true
          
          // Create or update user document in Firestore
          await this.createOrUpdateUserDocument(user)
        } else {
          this.user = null
          this.isAuthenticated = false
        }
        
        // Notify all listeners
        this.listeners.forEach(callback => callback(this.user))
        resolve(this.user)
      })
    })
  }

  // Google Sign In
  async signInWithGoogle() {
    try {
      const result = await signInWithGoogle()
      return result.user
    } catch (error) {
      console.error('Google sign in error:', error)
      throw error
    }
  }

  // Sign Out
  async signOut() {
    try {
      await signOutUser()
      this.user = null
      this.isAuthenticated = false
      return true
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }

  // Create or update user document in Firestore
  async createOrUpdateUserDocument(user) {
    if (!user) return

    const userRef = doc(db, 'users', user.uid)
    
    try {
      const userDoc = await getDoc(userRef)
      
      if (!userDoc.exists()) {
        // Create new user document
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
          lastSignIn: serverTimestamp(),
          githubConnected: false,
          linkedinConnected: false,
          plan: 'free',
          resumeCount: 0
        })
      } else {
        // Update existing user document
        await updateDoc(userRef, {
          lastSignIn: serverTimestamp(),
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        })
      }
    } catch (error) {
      console.error('Error creating/updating user document:', error)
    }
  }

  // Get user data from Firestore
  async getUserData(uid = null) {
    const userId = uid || this.user?.uid
    if (!userId) return null

    try {
      const userRef = doc(db, 'users', userId)
      const userDoc = await getDoc(userRef)
      
      if (userDoc.exists()) {
        return userDoc.data()
      }
      return null
    } catch (error) {
      console.error('Error fetching user data:', error)
      return null
    }
  }

  // Update user profile
  async updateUserProfile(updates) {
    if (!this.user) return false

    try {
      const userRef = doc(db, 'users', this.user.uid)
      await updateDoc(userRef, {
        ...updates,
        updatedAt: serverTimestamp()
      })
      return true
    } catch (error) {
      console.error('Error updating user profile:', error)
      return false
    }
  }

  // Connect social accounts
  async connectGitHub(githubData) {
    return this.updateUserProfile({
      githubConnected: true,
      githubUsername: githubData.username,
      githubData: githubData
    })
  }

  async connectLinkedIn(linkedinData) {
    return this.updateUserProfile({
      linkedinConnected: true,
      linkedinData: linkedinData
    })
  }

  // Subscribe to auth state changes
  onAuthStateChanged(callback) {
    this.listeners.push(callback)
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback)
    }
  }

  // Get current user
  getCurrentUser() {
    return this.user
  }

  // Check if user is authenticated
  isLoggedIn() {
    return this.isAuthenticated
  }
}

// Create singleton instance
const authService = new AuthService()

export default authService
