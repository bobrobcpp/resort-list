import { ArrowDownAZ, PoundSterling, Star } from 'lucide-react';

export const DynamicIcon = ({ icon }: { icon: string }) => {
    switch (icon) {
        case 'ArrowDownAZ':
            return <ArrowDownAZ color='grey' />;
        case 'PoundSterling':
            return <PoundSterling color='grey' />;
        case 'Star':
            return <Star color='grey' />;
        default:
            return null;
    }
}