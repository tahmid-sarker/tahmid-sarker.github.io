"use client";

import { useLanguage } from "@/components/providers";

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer>
            <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
                <p className="pb-20 text-center text-sm text-muted-foreground md:mt-6 md:pb-6">
                    &copy; {new Date().getFullYear()} {t("footer")}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
