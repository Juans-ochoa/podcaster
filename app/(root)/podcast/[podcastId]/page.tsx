const PodcastDetails = ({ params }: { params: { podcastId: string } }) => {
  return (
    <p className="text-2xl text-white-1">Podacast details {params.podcastId}</p>
  );
};

export default PodcastDetails;
