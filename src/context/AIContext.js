import { createContext, useState, useContext } from 'react' 

export const AIContext = createContext()
export const useAIContext = () => {
  const context = useContext(AIContext)
  if (!context) {
    throw new Error('useAIContext must be used within AIContextProvider')
  }
  return context
}

export function AIContextProvider({ children }) {
  const [styleProfile, setStyleProfile] = useState(null)
  
  const getRecommendations = async (preferences) => {
    const mockResponse = []
    return mockResponse
  }

  return (
    <AIContext.Provider value={{ styleProfile, getRecommendations, setStyleProfile }}>
      {children}
    </AIContext.Provider>
  )
}