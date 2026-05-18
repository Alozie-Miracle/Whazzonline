import { UserProfile } from '@/types'
import { UserIcon } from 'lucide-react'
import Image from 'next/image'


type Props = {
    profile: UserProfile | null;
    isDark: boolean;
    user: {
        id: string;
        email: string;
    } | null
}

const Profile = ({ profile, isDark, user }: Props) => {
  return (
    <div className={`max-w-2xl border p-12 transition-colors rounded-xl ${isDark ? 'border-[#333333]' : 'border-[#E5E5E1]'}`}>
        <div className="flex flex-col sm:flex-row items-center gap-12 mb-16">
            <div className={`w-32 h-32 border rounded-full flex items-center justify-center overflow-hidden relative transition-colors ${isDark ? 'bg-[#1A1A1A] border-[#333333]' : 'bg-[#EEEDEA] border-[#E5E5E1]'}`}>
                {profile?.photoURL ? (
                    <Image src={profile.photoURL} alt="Avatar" fill className="object-cover" unoptimized />
                ) : (
                    <UserIcon className={`w-12 h-12 transition-colors ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                )}
            </div>
            <div className="space-y-2 text-center sm:text-left">
                <h2 className={`text-3xl font-serif italic transition-colors ${isDark ? 'text-white' : 'text-black'}`}>{profile?.displayName}</h2>
                <p className={`text-[10px] font-mono uppercase transition-colors ${isDark ? 'text-white/60' : 'text-black/40'}`}>{profile?.email}</p>
            </div>
        </div>
        
        <div className="space-y-12">
            <div className={`grid grid-cols-2 gap-12 text-sm transition-colors ${isDark ? 'text-white' : 'text-black'}`}>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Member Since</label>
                    <div className="font-mono">{new Date(profile?.createdAt || 0).toLocaleDateString()}</div>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">User Identity</label>
                    <div className="font-mono truncate">{user?.id.toUpperCase()}</div>
                </div>
            </div>
            
            <div className={`pt-12 border-t transition-colors ${isDark ? 'border-[#333333]' : 'border-[#E5E5E1]'}`}>
                <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-6 transition-colors ${isDark ? 'text-white/60' : 'text-black/40'}`}>Security Settings</h3>
                <button className={`text-[10px] font-bold border px-6 py-3 uppercase tracking-widest transition-all ${
                isDark 
                    ? 'border-white text-white hover:bg-white hover:text-[#1A1A1A]' 
                    : 'border-black text-[#1A1A1A] hover:bg-black hover:text-white'
                }`}>
                    Reset Access Key
                </button>
            </div>
        </div>
    </div>
  )
}

export default Profile
