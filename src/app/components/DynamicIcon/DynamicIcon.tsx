import { ArrowDownAZ, PoundSterling, Star } from 'lucide-react';

export const DynamicIcon = ({ icon }: { icon: string }) => {
    switch (icon) {
        case 'ArrowDownAZ':
            return <ArrowDownAZ color='grey' role='img' />;
        case 'PoundSterling':
            return <PoundSterling color='grey' role='img' />;
        case 'Star':
            return <Star color='grey' role='img' />;
        default:
            return null;
    }
}