export default function ApplicationLogo(props) {
    return (
        <>
            <img src="/images/logo-white.png" alt="Logo" {...props} className="w-2/4 dark:hidden block" />
            <img src="/images/logo-dark.png" alt="Site Logo" {...props} className="w-2/4 hidden dark:block" />
        </>
    );
}
