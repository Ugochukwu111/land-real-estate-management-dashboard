import { create } from "zustand";

const useListingStore = create((set)=>({

  listing: [],
  setListing: (newListing) => set({listing: newListing}),
  removeListing: (idToRemove) => set((state) => ({
    listing: state.listing.filter((item) => item._id !== idToRemove)
  })),
  addListing: (newListing) => set((state) => ({
    listing: [newListing, ...state.listing] 
  }))

}));

export default useListingStore;
