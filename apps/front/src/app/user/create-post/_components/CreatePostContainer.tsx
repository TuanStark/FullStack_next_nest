'use client'

import { saveNewPost } from "@/lib/actions/postAction"
import { useActionState } from "react";
import UpsertPostForm from "./upsertPostForm";


export default function CreatePostContainer() {
    const [state, action] = useActionState(saveNewPost, undefined);
  return (
    <UpsertPostForm state={state} formAction={action}/>
  )
}
