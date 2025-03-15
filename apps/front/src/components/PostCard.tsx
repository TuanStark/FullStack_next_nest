import { Post } from "@/lib/types/modelTypes";
import Image from "next/image";
import Link from "next/link";

type Props = Partial<Post>;
export default function PostCard({
    id,
    title,
    slug,
    thumbnail,
    content,
    createdAt
}: Props) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="relative h-60 ">
                <Image
                    src={thumbnail ?? "/no-image.png"}
                    alt={title ?? ""} fill />
            </div>
            <div className="p-6 flex-grow  flex flex-col">
                <h3 className="text-lg font-bold mt-4 break-words text-center text-gray-600">
                    {title}
                </h3>
                <p className="mt-2 text-gray-500 text-sm ">
                    {new Date(createdAt ?? "").toLocaleDateString()}
                </p>
                <p className="mt-4 text-gray-700 break-words">
                    {/* xuat hien dau 3 cham khi qua dai */}
                    {content?.slice(0, 100)}...
                </p>
                <Link
                    className="text-indigo-600 hover:underline mt-auto text-right block"
                    href={`/blog/${slug}/${id}`}
                >
                    Read more
                </Link>
            </div>
        </div>
    )
}
