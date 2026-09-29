type YouTubeEmbedProps = {
    videoId: string;
    title: string;
};

export default function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
    const params = new URLSearchParams({
        autoplay: "1",
        playsinline: "1",
        loop: "0",
        playlist: videoId,
        controls: "0",
    });

    return (
        <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?${params}`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="w-full aspect-video rounded-lg"
        />
    );
}
