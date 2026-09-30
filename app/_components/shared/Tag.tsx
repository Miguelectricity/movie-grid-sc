const colorClasses = {
    gray:   "bg-gray-800 text-gray-200 border-gray-300",
};

type TagProps = {
    children: React.ReactNode;
    color?: keyof typeof colorClasses;
};

export default function Tag({ children, color = "gray" }: TagProps) {
    return (
        <span className={`rounded-full px-2 py-0.5 text-xs ${colorClasses[color]}`}>
            {children}
        </span>
    );
}
