import { create } from "zustand";

type AttachmentStore = {
  attachment: string | undefined;
  setAttachment: (name: string | undefined) => void;
};

export const useAttachmentStore = create<AttachmentStore>((set) => ({
  attachment: "",
  setAttachment: (name) => {
    set(() => ({
      attachment: name,
    }));
  },
}));
