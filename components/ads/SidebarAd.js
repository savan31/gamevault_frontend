import AdBanner from './AdBanner';

export default function SidebarAd() {
    return (
        <div className="card p-4">
            <p className="text-xs text-dark-500 mb-2 text-center">Advertisement</p>
            <AdBanner
                slot="sidebar"
                format="vertical"
                className="min-h-[250px]"
                style={{ minHeight: '250px' }}
            />
        </div>
    );
}