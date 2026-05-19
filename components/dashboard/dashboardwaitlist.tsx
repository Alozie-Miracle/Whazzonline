import { Product } from '@/types';
import { Heart } from 'lucide-react'
import Image from 'next/image'


type Props = {
    isDark: boolean;
    router: any;
    enrichedWishlist: Product[]
};

const DashboardWaitlist = ({ enrichedWishlist, isDark, router }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {enrichedWishlist.length > 0 ? (
        enrichedWishlist.map((item) => (
            <div 
            key={item._id} 
            className="group cursor-pointer"
            onClick={() => router.push(`/product/${item._id}`)}
            >
            <div className={`aspect-4/5 mb-6 overflow-hidden relative border transition-colors rounded-xl ${isDark ? 'bg-[#1A1A1A] border-[#333333]' : 'bg-[#EEEDEA] border-[#E5E5E1]'}`}>
                <Image
                    src={item.imageUrl} 
                    alt={item.name} 
                    fill
                    sizes="(max-w-1024px) 50vw, 33vw"
                    className={`object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 ${isDark ? 'opacity-80' : ''}`} 
                />
                <div className={`absolute top-4 right-4 h-8 w-8 flex items-center justify-center shadow-lg transition-colors ${isDark ? 'bg-[#121212]' : 'bg-white'}`}>
                <Heart className={`w-4 h-4 transition-colors ${isDark ? 'fill-white text-white' : 'fill-black text-black'}`} />
                </div>
            </div>
            <div className="flex justify-between items-start">
                <div>
                <h4 className={`text-lg font-serif italic transition-colors ${isDark ? 'text-white' : 'text-black'}`}>{item.name}</h4>
                <p className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${isDark ? 'text-white/60' : 'text-black/40'}`}>{item.category}</p>
                </div>
                <span className={`font-mono text-sm tracking-tighter font-bold transition-colors ${isDark ? 'text-white' : 'text-black'}`}>${item.price.toFixed(2)}</span>
            </div>
            </div>
        ))
        ) : (
        <div className={`col-span-full py-32 text-center border-2 border-dashed rounded-4xl transition-colors ${isDark ? 'border-[#333333]' : 'border-[#E5E5E1]'}`}>
            <Heart className={`w-8 h-8 mx-auto mb-6 transition-colors ${isDark ? 'text-gray-700' : 'text-gray-200'}`} />
            <h3 className={`text-xl font-serif italic transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>Wishlist empty</h3>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-2">Curate your future acquisitions</p>
        </div>
        )}
    </div>
  )
}

export default DashboardWaitlist
