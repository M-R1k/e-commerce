import { useTranslation } from "react-i18next";

export default function NavBarAdmin () {
    const { t } = useTranslation();

    return (
        <div className="flex mt-16 mb-2">
            <a href="/admin" className="text-3xl text-gold mr-4">{t('navBarAdmin.dashboard')}</a>
            <a href="/admin/stats" className="text-3xl text-gold mr-4">{t('navBarAdmin.stats')}</a>
        </div>
    )
}