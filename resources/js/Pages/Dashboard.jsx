import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, ...props }) {

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl dark:text-white text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-24 px-10">
                <div className="bg-gray-800 dark:bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-white text-center dark:text-gray-800">
                        <h2 className='text-2xl font-bold'>Welcome, Team Admin!</h2>
                        <p>Stay on top of your tasks and collaborate efficiently. Your success starts here!</p>
                    </div>
                </div>
                <div className="stats stats-vertical mt-5 lg:stats-horizontal shadow grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1">
                    <div className="stat text-center bg-gray-800 text-white dark:bg-white dark:text-gray-800">
                        <div className="">Downloads</div>
                        <div className="stat-value">31K</div>
                        <div className="">Jan 1st - Feb 1st</div>
                    </div>

                    <div className="stat text-center bg-gray-800 text-white dark:bg-white dark:text-gray-800">
                        <div className="">Downloads</div>
                        <div className="stat-value">31K</div>
                        <div className="">Jan 1st - Feb 1st</div>
                    </div>

                    <div className="stat text-center bg-gray-800 text-white dark:bg-white dark:text-gray-800">
                        <div className="">New Users</div>
                        <div className="stat-value">4,200</div>
                        <div className="">↗︎ 400 (22%)</div>
                    </div>

                    <div className="stat text-center bg-gray-800 text-white dark:bg-white dark:text-gray-800">
                        <div className="">New Registers</div>
                        <div className="stat-value">1,200</div>
                        <div className="">↘︎ 90 (14%)</div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
