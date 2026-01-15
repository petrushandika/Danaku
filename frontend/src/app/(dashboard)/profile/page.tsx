"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { ResponsiveModal } from "@/components/responsive-modal";
import {
  User,
  Mail,
  Camera,
  Lock,
  Globe,
  Bell,
  Phone,
  Calendar,
  Users,
  Trophy,
  Medal,
  Plus,
  Shield,
  Loader2,
} from "lucide-react";
import { useLanguageStore, translations } from "@/store/use-language-store";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/store/use-auth-store";
import {
  getProfile,
  updateProfile,
  getSettings,
  updateSettings,
  uploadAvatar,
  changePassword,
  UserProfile,
  UserSettings,
} from "@/lib/api/users";
import { format } from "date-fns";

export default function ProfilePage() {
  const { language, setLanguage } = useLanguageStore();
  const { theme, setTheme } = useTheme();
  const { user: authUser, setUser: setAuthUser } = useAuthStore();
  const t = translations[language].dashboard.profile;
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  // Real Data State
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);

  // Form States
  const [profileForm, setProfileForm] = useState({
    name: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileData, settingsData] = await Promise.all([
        getProfile(),
        getSettings(),
      ]);

      setUserProfile(profileData);
      setUserSettings(settingsData);

      // Initialize Profile Form
      setProfileForm({
        name: profileData.name || "",
        phoneNumber: profileData.phoneNumber || "",
        birthDate: profileData.birthDate
          ? new Date(profileData.birthDate).toISOString().split("T")[0]
          : "",
        gender: profileData.gender || "",
      });

      // Sync Global Stores
      if (settingsData.language && settingsData.language !== language) {
        setLanguage(settingsData.language as any);
      }
      if (settingsData.theme && settingsData.theme !== theme) {
        setTheme(settingsData.theme);
      }
    } catch (error) {
      console.error("Failed to load profile", error);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const loadingToast = toast.loading("Uploading avatar...");
        const result = await uploadAvatar(file);

        // Update local state
        const updatedProfile = { ...userProfile!, avatarUrl: result.avatarUrl };
        setUserProfile(updatedProfile);

        // Update auth store
        if (authUser) {
          setAuthUser({ ...authUser, avatarUrl: result.avatarUrl });
        }

        toast.dismiss(loadingToast);
        toast.success("Avatar updated successfully");
      } catch (error: any) {
        toast.error("Failed to upload avatar", { description: error.message });
      }
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const updated = await updateProfile({
        name: profileForm.name,
        phoneNumber: profileForm.phoneNumber,
        birthDate: profileForm.birthDate || undefined,
        gender: profileForm.gender,
      });

      setUserProfile(updated);
      if (authUser) {
        setAuthUser({ ...authUser, name: updated.name });
      }

      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error("Failed to update profile", { description: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSettings = async (partialSettings: Partial<UserSettings>) => {
    // Optimistic Update
    const prevSettings = userSettings;
    setUserSettings((prev) => (prev ? { ...prev, ...partialSettings } : null));

    try {
      await updateSettings(partialSettings);
      toast.success("Settings updated");
    } catch (error: any) {
      setUserSettings(prevSettings); // Rollback
      toast.error("Failed to update settings");
    }
  };

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      toast.error("Please fill all password fields");
      return;
    }

    setIsSaving(true);
    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      toast.success("Password changed successfully");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      toast.error("Failed to change password", {
        description:
          error.response?.data?.message || "Verify your current password",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!mounted) return null;

  const TabButton = ({
    id,
    icon: Icon,
    label,
  }: {
    id: string;
    icon: any;
    label: string;
  }) => (
    <Button
      variant="ghost"
      onClick={() => setActiveTab(id)}
      className={`w-full justify-start rounded-2xl h-12 gap-3 font-bold transition-all duration-300 ${
        activeTab === id
          ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 shadow-sm ring-1 ring-emerald-500/20"
          : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
      }`}
    >
      <Icon
        className={`w-5 h-5 ${
          activeTab === id ? "text-emerald-600" : "text-slate-400"
        }`}
      />
      {label}
    </Button>
  );

  const Toggle = ({
    checked,
    onCheckedChange,
  }: {
    checked: boolean;
    onCheckedChange: (c: boolean) => void;
  }) => (
    <div
      onClick={() => onCheckedChange(!checked)}
      className={`w-14 h-8 shrink-0 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        checked ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300 ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </div>
  );

  return (
    <div className="space-y-10 pb-10 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1
          className="text-4xl font-black tracking-tight text-slate-900 dark:text-white"
          dangerouslySetInnerHTML={{ __html: t.title }}
        />
        <p className="text-slate-500 dark:text-slate-400 font-medium mt-2 transition-colors duration-300">
          {t.subtitle}
        </p>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div className="lg:hidden mb-8">
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger className="w-full h-14 rounded-2xl bg-white dark:bg-slate-900 border-border shadow-sm text-slate-900 dark:text-white font-bold px-4 transition-all active:scale-[0.99]">
            {/* Simplified Trigger Content */}
            <span className="capitalize">{activeTab}</span>
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-border shadow-xl bg-white dark:bg-slate-900 overflow-hidden p-1 max-h-[40vh] overflow-y-auto">
            <SelectItem value="personal">Personal Info</SelectItem>
            <SelectItem value="security">Security</SelectItem>
            <SelectItem value="notifications">Notifications</SelectItem>
            <SelectItem value="display">Display</SelectItem>
            <SelectItem value="achievements">Achievements</SelectItem>
            <SelectItem value="family">Family</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="hidden lg:block space-y-4">
          <Card className="border-border bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm transition-all duration-300">
            <CardContent className="p-4 space-y-1">
              <TabButton id="personal" icon={User} label={t.personalInfo} />
              <TabButton id="security" icon={Lock} label="Security" />
              <TabButton id="achievements" icon={Trophy} label="Achievements" />
              <TabButton id="family" icon={Users} label="Family" />
              <TabButton id="notifications" icon={Bell} label="Notifications" />
              <TabButton id="display" icon={Globe} label="Display" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-border bg-white dark:bg-slate-900 rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-sm transition-all duration-300">
            <CardHeader className="p-6 md:p-8 border-b border-border bg-slate-50/50 dark:bg-slate-800/30">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-900 overflow-hidden bg-slate-100 dark:bg-slate-800 transition-transform duration-500 group-hover:scale-105 shadow-md">
                    <img
                      src={
                        userProfile?.avatarUrl ||
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80"
                      }
                      alt="Avatar"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 p-2.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all duration-300 hover:shadow-sm active:scale-95 cursor-pointer z-10"
                  >
                    <Camera className="w-5 h-5" />
                  </label>
                </div>
                <div className="text-center md:text-left space-y-1">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white transition-colors duration-300">
                    {userProfile?.name || "User"}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs transition-colors duration-300">
                    {userProfile?.plan || "Free"} Plan •{" "}
                    {userProfile?.isVerified ? "Verified" : "Unverified"}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-8">
              {/* Personal Information */}
              {activeTab === "personal" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="space-y-2">
                    <Label className="font-bold">Full Name</Label>
                    <Input
                      value={profileForm.name}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, name: e.target.value })
                      }
                      className="rounded-2xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold">Phone Number</Label>
                    <Input
                      value={profileForm.phoneNumber}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          phoneNumber: e.target.value,
                        })
                      }
                      className="rounded-2xl"
                      placeholder="+62..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold">Email</Label>
                    <Input
                      value={userProfile?.email || ""}
                      readOnly
                      className="rounded-2xl opacity-70"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold">Birth Date</Label>
                    <Input
                      type="date"
                      value={profileForm.birthDate}
                      onChange={(e) =>
                        setProfileForm({
                          ...profileForm,
                          birthDate: e.target.value,
                        })
                      }
                      className="rounded-2xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold">Gender</Label>
                    <Select
                      value={profileForm.gender}
                      onValueChange={(v) =>
                        setProfileForm({ ...profileForm, gender: v })
                      }
                    >
                      <SelectTrigger className="rounded-2xl">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-full pt-4">
                    <Button
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className="w-full md:w-auto rounded-full bg-emerald-600 font-bold"
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              )}

              {/* Security */}
              {activeTab === "security" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="font-black text-lg">Change Password</h3>
                      <div className="space-y-2">
                        <Label>Current Password</Label>
                        <PasswordInput
                          value={passwordForm.currentPassword}
                          onChange={(e) =>
                            setPasswordForm({
                              ...passwordForm,
                              currentPassword: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>New Password</Label>
                        <PasswordInput
                          value={passwordForm.newPassword}
                          onChange={(e) =>
                            setPasswordForm({
                              ...passwordForm,
                              newPassword: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Confirm Password</Label>
                        <PasswordInput
                          value={passwordForm.confirmPassword}
                          onChange={(e) =>
                            setPasswordForm({
                              ...passwordForm,
                              confirmPassword: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Button
                        onClick={handleChangePassword}
                        disabled={isSaving}
                        className="rounded-full bg-emerald-600 font-bold"
                      >
                        Update Password
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-black text-lg">
                        Two-Factor Authentication
                      </h3>
                      <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl flex items-center justify-between">
                        <div>
                          <p className="font-bold text-emerald-900 dark:text-emerald-400">
                            Enable 2FA
                          </p>
                          <p className="text-sm text-emerald-700">
                            Secure your account
                          </p>
                        </div>
                        <Toggle
                          checked={userSettings?.twoFactorEnabled || false}
                          onCheckedChange={(c) =>
                            handleSaveSettings({ twoFactorEnabled: c })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications */}
              {activeTab === "notifications" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="font-black text-lg">
                    Notification Preferences
                  </h3>
                  {["emailNotif", "pushNotif", "marketingNotif"].map((key) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 rounded-2xl border border-border bg-slate-50/30"
                    >
                      <div>
                        <p className="font-bold capitalize">
                          {key.replace("Notif", " Notifications")}
                        </p>
                      </div>
                      <Toggle
                        checked={(userSettings as any)?.[key] || false}
                        onCheckedChange={(c) =>
                          handleSaveSettings({ [key]: c })
                        }
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Display */}
              {activeTab === "display" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="font-black text-lg">Display Settings</h3>
                  <div className="space-y-4">
                    <Label>Theme</Label>
                    <div className="flex gap-4">
                      {["light", "dark"].map((m) => (
                        <div
                          key={m}
                          onClick={() => {
                            setTheme(m);
                            handleSaveSettings({ theme: m });
                          }}
                          className={`p-4 border-2 rounded-2xl cursor-pointer ${
                            theme === m
                              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                              : "border-border"
                          }`}
                        >
                          <span className="capitalize font-bold">{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label>Language</Label>
                    <div className="flex gap-4">
                      {["en", "id"].map((l) => (
                        <div
                          key={l}
                          onClick={() => {
                            setLanguage(l as any);
                            handleSaveSettings({ language: l });
                          }}
                          className={`p-4 border-2 rounded-2xl cursor-pointer ${
                            language === l
                              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                              : "border-border"
                          }`}
                        >
                          <span className="capitalize font-bold">
                            {l === "en" ? "English" : "Indonesia"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Achievements - Display Real Data */}
              {activeTab === "achievements" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-lg">My Achievements</h3>
                  </div>
                  {/* Level Card */}
                  <div className="bg-gradient-to-br from-emerald-600 to-teal-500 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                    <div className="relative z-10 flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-3xl font-black">Level 1</h2>
                      </div>
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-black">
                        {userProfile?.userAchievements?.length || 0}
                      </div>
                    </div>
                    <p className="relative z-10 text-emerald-100">
                      Total badges unlocked
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {userProfile?.userAchievements?.map(
                      (ua: any, i: number) => (
                        <div
                          key={i}
                          className="p-4 rounded-2xl border bg-emerald-50 border-emerald-200 flex flex-col items-center text-center"
                        >
                          <div className="text-3xl mb-2">
                            {ua.achievement.icon || "🏆"}
                          </div>
                          <p className="font-bold text-sm text-emerald-800">
                            {ua.achievement.title}
                          </p>
                          <p className="text-xs text-emerald-600">
                            {ua.achievement.description}
                          </p>
                        </div>
                      )
                    ) || (
                      <p className="col-span-4 text-center text-gray-500">
                        No achievements yet.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Family - Display Real Data */}
              {activeTab === "family" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-lg">Family Members</h3>
                    {/* Add member button could go here, but implementing full family management is complex */}
                  </div>
                  <div className="grid gap-4">
                    {userProfile?.members?.map((groupMember: any) =>
                      groupMember.group.members.map((m: any, idx: number) => (
                        <div
                          key={`${groupMember.id}-${idx}`}
                          className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-3xl border border-border"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                              <img
                                src={
                                  m.user?.avatarUrl ||
                                  "https://github.com/shadcn.png"
                                }
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-bold">{m.name}</p>
                              <p className="text-xs text-slate-500">
                                {m.role} • {m.relation}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold text-slate-400">
                              LIMIT
                            </p>
                            <p className="font-black">
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              }).format(Number(m.monthlyLimit))}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                    {(!userProfile?.members ||
                      userProfile.members.length === 0) && (
                      <p className="text-center text-gray-500 py-10">
                        No family members found.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
