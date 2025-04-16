import { useRouter } from 'next/router';

export default function BrowsePage() {
    const router = useRouter();
    const { path } = router.query;

    // Convert path array to string if it exists
    const fullPath = path ? `/${Array.isArray(path) ? path.join('/') : path}` : '';

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Current Path:</h1>
            <p className="text-lg">{fullPath}</p>
        </div>
    );
} 