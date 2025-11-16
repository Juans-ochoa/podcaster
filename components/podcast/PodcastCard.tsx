import { PodcastCardProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PodcastCard = ({
  title,
  imgUrl,
  description,
  podcastId,
}: PodcastCardProps) => {
  const router = useRouter();

  const handleViews = () => {
    router.push(`/podcasts/${podcastId}`, {
      scroll: true,
    });
  };

  return (
    <article className="cursor-pointer" onClick={handleViews}>
      <figure className="flex flex-col gap-2">
        <Image
          src={imgUrl}
          alt={title}
          width={177}
          height={174}
          className="aspect-square h-fit w-full rounded-xl 2xl:size-[200px]"
        />
        <div className="flex flex-col">
          <h2 className="text-16 truncate font-bold text-white-1">{title}</h2>
          <h3 className="text-12 truncate font-normal capitalize text-white-4">
            {description}
          </h3>
        </div>
      </figure>
    </article>
  );
};

export default PodcastCard;
