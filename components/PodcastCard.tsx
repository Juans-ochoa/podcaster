import Image from "next/image";

interface Props {
  id?: number;
  title: string;
  imgURL: string;
  description: string;
}

const PodcastCard = ({ title, imgURL, description }: Props) => {
  return (
    <article className="cursor-pointer">
      <figure className="flex flex-col gap-2">
        <Image
          src={imgURL}
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
