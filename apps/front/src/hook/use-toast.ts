"use client";

import * as React from "react";
import { toast as sonnerToast } from "sonner";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 4000; // Adjust as needed

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

function toast({ ...props }) {
  const id = genId();
  
  const dismiss = () => sonnerToast.dismiss(id);
  
  sonnerToast(props.title || "Notification", {
    id,
    description: props.description,
    action: props.action,
    duration: TOAST_REMOVE_DELAY,
    onDismiss: dismiss,
    ...props,
  });

  return { id, dismiss };
}

function useToast() {
  return { toast, dismiss: sonnerToast.dismiss };
}

export { useToast, toast };
