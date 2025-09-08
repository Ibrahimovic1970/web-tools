import { Link } from 'react-router-dom';
import { FaToolbox } from 'react-icons/fa';

export default function Navbar() {
    return (
        <nav className="bg-white shadow-sm border-b px-6 py-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FaToolbox className="text-blue-600 text-xl" />
                    <Link to="/" className="font-bold text-lg text-gray-800">
                        Tools.Bazma
                    </Link>
                </div>
                <div className="text-sm text-gray-500">
                    Tools untuk belajar
                </div>
            </div>
        </nav>
    );
}