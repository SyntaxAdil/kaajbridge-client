"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  User, Edit3, X, Check, Loader2, Upload,
  Briefcase, GraduationCap, Code, ShieldAlert, ShieldCheck, Globe,
  FileText, FileImage, VenetianMask
} from "lucide-react";
import { toast } from "react-hot-toast";
import { authClient } from "../../lib/auth/auth-client";
import { FaLinkedin, FaGithub } from "react-icons/fa6";

const GENDER_OPTIONS = [
  { value: "", label: "Prefer not to say" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const PLAN_STYLES = {
  free: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  basic: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  premium: "bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-700 dark:from-violet-500/10 dark:to-fuchsia-500/10 dark:text-violet-400",
};

function PlanBadge({ plan }) {
  const key = plan || "free";
  const label = key.charAt(0).toUpperCase() + key.slice(1);
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border border-transparent px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${PLAN_STYLES[key] || PLAN_STYLES.free}`}>
      {label} Plan
    </span>
  );
}

function AvatarDisplay({ src, isEditing, onChange }) {
  return (
    <div className="relative size-32 rounded-3xl overflow-hidden border-[5px] border-white dark:border-zinc-900 shadow-xl bg-zinc-100 dark:bg-zinc-800 shrink-0 flex items-center justify-center">
      {src ? (
        <Image src={src} alt="Profile" fill className="object-cover" />
      ) : (
        <User className="size-12 text-zinc-300 dark:text-zinc-600" />
      )}
      {isEditing && (
        <label className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-all">
          <div className="flex flex-col items-center gap-1 text-white">
            <Upload className="size-5" />
            <span className="text-[10px] font-semibold">Upload</span>
          </div>
          <input type="file" accept="image/*" className="hidden" onChange={onChange} />
        </label>
      )}
    </div>
  );
}

export default function ProfileForm({ serverUser }) {
  const router = useRouter();
  const role = serverUser?.role || "seeker";
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [certPreview, setCertPreview] = useState("");
  const [showMissingAlert, setShowMissingAlert] = useState(false);
  const [missingReason, setMissingReason] = useState("");

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      name: "",
      gender: "",
      phoneNumber: "",
      address: "",
      city: "",
      country: "",
      github: "",
      linkedin: "",
      portfolio: "",
      resumeUrl: "",
      institutionName: "",
      degree: "Diploma",
      department: "",
      cgpa: "",
      passingYear: "",
      academicCertificate: "",
      skills: "",
      experience: "",
      recruiterPosition: "",
      isStudentVerified: false
    }
  });

  const formValues = watch();

  useEffect(() => {
    if (!serverUser) return;
    reset({
      name: serverUser?.name || "",
      gender: serverUser?.gender || "",
      phoneNumber: serverUser?.phoneNumber || "",
      address: serverUser?.address || "",
      city: serverUser?.city || "",
      country: serverUser?.country || "",
      github: serverUser?.github || "",
      linkedin: serverUser?.linkedin || "",
      portfolio: serverUser?.portfolio || "",
      resumeUrl: serverUser?.resumeUrl || "",
      institutionName: serverUser?.institutionName || "",
      degree: serverUser?.degree || "Diploma",
      department: serverUser?.department || "",
      cgpa: serverUser?.cgpa || "",
      passingYear: serverUser?.passingYear || "",
      academicCertificate: serverUser?.academicCertificate || "",
      skills: serverUser?.skills || "",
      experience: serverUser?.experience || "",
      recruiterPosition: serverUser?.recruiterPosition || "",
      isStudentVerified: serverUser?.isStudentVerified || false
    });
    setImagePreview(serverUser?.image || "");
    setCertPreview(serverUser?.academicCertificate || "");
  }, [serverUser, reset]);

  useEffect(() => {
    if (!serverUser) return;
    let hasMissing = false;
    let reason = "";

    if (!formValues.name || !formValues.phoneNumber || !formValues.city) {
      hasMissing = true;
      reason = "Complete your basic information";
    }

    if (role === "seeker") {
      if (!formValues.institutionName || !formValues.department || !formValues.academicCertificate) {
        hasMissing = true;
        reason = "Add your academic details and certificate";
      } else if (!formValues.isStudentVerified) {
        hasMissing = true;
        reason = "Confirm your student verification statement below";
      }
    }

    if (role === "recruiter") {
      if (!formValues.recruiterPosition) {
        hasMissing = true;
        reason = "Add your designation";
      }
    }

    setMissingReason(reason);
    setShowMissingAlert(hasMissing);
  }, [formValues, serverUser, role]);

  const uploadToImgbb = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      { method: "POST", body: formData }
    );
    const result = await response.json();
    if (result.success) return result.data.url;
    throw new Error("Upload failed");
  };

  const handleFileChange = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === "profile") {
      setImagePreview(URL.createObjectURL(file));
      setValue("profileFile", e.target.files);
    } else if (type === "certificate") {
      setCertPreview(URL.createObjectURL(file));
      setValue("certFile", e.target.files);
    } else if (type === "resume") {
      setValue("resumeFile", e.target.files);
      toast.success("Resume attached. Click Save to upload.");
    }
  };

  const onSubmit = async (data) => {
    if (role === "seeker" && !data.isStudentVerified) {
      toast.error("Please confirm the student verification statement");
      return;
    }

    try {
      setIsSubmitting(true);
      let imageUrl = imagePreview;
      let certUrl = certPreview;
      let resumeUrl = data.resumeUrl;

      if (data.profileFile && data.profileFile[0]) {
        imageUrl = await uploadToImgbb(data.profileFile[0]);
      }
      if (data.certFile && data.certFile[0]) {
        certUrl = await uploadToImgbb(data.certFile[0]);
      }
      if (data.resumeFile && data.resumeFile[0]) {
        resumeUrl = await uploadToImgbb(data.resumeFile[0]);
      }

      const updatePayload = {
        name: data.name,
        image: imageUrl,
        gender: data.gender,
        phoneNumber: data.phoneNumber,
        address: data.address,
        city: data.city,
        country: data.country
      };

      if (role === "seeker") {
        Object.assign(updatePayload, {
          github: data.github,
          linkedin: data.linkedin,
          portfolio: data.portfolio,
          resumeUrl: resumeUrl,
          institutionName: data.institutionName,
          degree: data.degree,
          department: data.department,
          cgpa: data.cgpa,
          passingYear: data.passingYear,
          academicCertificate: certUrl,
          skills: data.skills,
          experience: data.experience,
          isStudentVerified: data.isStudentVerified
        });
      }

      if (role === "recruiter") {
        Object.assign(updatePayload, {
          linkedin: data.linkedin,
          recruiterPosition: data.recruiterPosition
        });
      }

      await authClient.updateUser(updatePayload, {
        onSuccess: () => {
          toast.success("Profile Updated Successfully");
          setIsEditing(false);
          setIsSubmitting(false);
          router.refresh();
        },
        onError: (ctx) => {
          setIsSubmitting(false);
          toast.error(ctx?.error?.message || "Failed to update profile");
        }
      });
    } catch (error) {
      setIsSubmitting(false);
      toast.error("Something went wrong during file upload");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4  space-y-6">
      <AnimatePresence>
        {showMissingAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-400 text-sm font-semibold shadow-sm"
          >
            <ShieldAlert className="size-5 shrink-0" />
            <div>{missingReason || "Your profile setup is incomplete."}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 shadow-sm"
      >
        <div className="h-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

        <div className="px-6 md:px-8 pb-8 relative">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 -mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
              <AvatarDisplay
                src={imagePreview}
                isEditing={isEditing}
                onChange={(e) => handleFileChange(e, "profile")}
              />

              <div className="pb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{serverUser?.name}</h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                    {role}
                  </span>
                  {role === "seeker" && serverUser?.isStudentVerified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="size-3" /> Verified Student
                    </span>
                  )}
                  <PlanBadge plan={role === "recruiter" ? serverUser?.plan : "free"} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{serverUser?.email}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (isEditing) reset();
                setIsEditing(!isEditing);
              }}
              className={`h-11 px-5 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                isEditing
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  : "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900"
              }`}
            >
              {isEditing ? (
                <>
                  <X className="size-4" /> Cancel
                </>
              ) : (
                <>
                  <Edit3 className="size-4" /> Edit Profile
                </>
              )}
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                <User className="size-4" /> Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Full Name</label>
                  <input {...register("name")} disabled={!isEditing} type="text" className="w-full h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 px-4 text-sm font-medium outline-none focus:border-blue-500 transition-all disabled:opacity-70" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Email Address (Locked)</label>
                  <input value={serverUser?.email || ""} disabled type="email" className="w-full h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 px-4 text-sm font-medium text-zinc-400" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Phone Number</label>
                  <input {...register("phoneNumber")} disabled={!isEditing} type="text" className="w-full h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 px-4 text-sm font-medium outline-none focus:border-blue-500 transition-all disabled:opacity-70" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1"><VenetianMask className="size-3.5" /> Gender</label>
                  <select {...register("gender")} disabled={!isEditing} className="w-full h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 px-4 text-sm font-medium outline-none focus:border-blue-500 transition-all disabled:opacity-70 appearance-none">
                    {GENDER_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Country</label>
                  <input {...register("country")} disabled={!isEditing} type="text" className="w-full h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 px-4 text-sm font-medium outline-none focus:border-blue-500 transition-all disabled:opacity-70" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">City</label>
                  <input {...register("city")} disabled={!isEditing} type="text" className="w-full h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 px-4 text-sm font-medium outline-none focus:border-blue-500 transition-all disabled:opacity-70" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Address</label>
                  <input {...register("address")} disabled={!isEditing} type="text" className="w-full h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 px-4 text-sm font-medium outline-none focus:border-blue-500 transition-all disabled:opacity-70" />
                </div>
              </div>
            </div>

            {role === "seeker" && (
              <>
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                    <Globe className="size-4" /> Professional Links & Portfolio
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold flex items-center gap-1 text-zinc-500"><FaGithub className="size-3.5" /> GitHub Profile</label>
                      <input {...register("github")} disabled={!isEditing} type="url" className="w-full h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 px-4 text-sm font-medium outline-none focus:border-blue-500 transition-all disabled:opacity-70" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold flex items-center gap-1 text-zinc-500"><FaLinkedin className="size-3.5" /> LinkedIn Profile</label>
                      <input {...register("linkedin")} disabled={!isEditing} type="url" className="w-full h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 px-4 text-sm font-medium outline-none focus:border-blue-500 transition-all disabled:opacity-70" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold flex items-center gap-1 text-zinc-500"><Globe className="size-3.5" /> Portfolio Website</label>
                      <input {...register("portfolio")} disabled={!isEditing} type="url" className="w-full h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 px-4 text-sm font-medium outline-none focus:border-blue-500 transition-all disabled:opacity-70" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold flex items-center gap-1 text-zinc-500"><FileText className="size-3.5" /> Resume / CV (PDF File Upload)</label>
                      <div className="flex items-center gap-4">
                        <input {...register("resumeUrl")} disabled type="text" placeholder="No resume uploaded" className="flex-1 h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 px-4 text-sm text-zinc-500" />
                        {isEditing && (
                          <label className="h-12 px-4 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 hover:border-blue-500 flex items-center justify-center gap-2 cursor-pointer text-sm font-medium transition-all">
                            <Upload className="size-4" /> Browse File
                            <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFileChange(e, "resume")} />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                    <GraduationCap className="size-4" /> Academic & Education Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-zinc-500">Institution Name</label>
                      <input {...register("institutionName")} disabled={!isEditing} type="text" className="w-full h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 px-4 text-sm font-medium outline-none focus:border-blue-500 transition-all disabled:opacity-70" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-500">Degree</label>
                      <select {...register("degree")} disabled={!isEditing} className="w-full h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 px-4 text-sm font-medium outline-none focus:border-blue-500 transition-all disabled:opacity-70 appearance-none">
                        <option value="Diploma">Diploma</option>
                        <option value="BSc">BSc</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-500">Department / Technology</label>
                      <input {...register("department")} disabled={!isEditing} type="text" className="w-full h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 px-4 text-sm font-medium outline-none focus:border-blue-500 transition-all disabled:opacity-70" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-500">CGPA</label>
                      <input {...register("cgpa")} disabled={!isEditing} type="text" className="w-full h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 px-4 text-sm font-medium outline-none focus:border-blue-500 transition-all disabled:opacity-70" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-500">Passing Year / Expected Graduation</label>
                      <input {...register("passingYear")} disabled={!isEditing} type="text" className="w-full h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 px-4 text-sm font-medium outline-none focus:border-blue-500 transition-all disabled:opacity-70" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-zinc-500 flex items-center gap-1"><FileImage className="size-3.5" /> Academic Certificate / Registration Card Image</label>
                      <div className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 bg-zinc-50 dark:bg-zinc-950/20">
                        {certPreview ? (
                          <div className="relative w-full max-w-xs h-40 rounded-xl overflow-hidden shadow-md">
                            <Image src={certPreview} alt="Certificate preview" fill className="object-cover" />
                            {isEditing && (
                              <button type="button" onClick={() => setCertPreview("")} className="absolute top-2 right-2 p-1.5 rounded-xl bg-black/70 text-white hover:bg-black/90 transition-all">
                                <X className="size-4" />
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="text-center space-y-2">
                            <FileImage className="size-8 text-zinc-400 mx-auto" />
                            <p className="text-xs text-zinc-500 font-medium">Upload running Registration card or Diploma certificate</p>
                            {isEditing && (
                              <label className="inline-flex h-9 px-4 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-bold items-center justify-center cursor-pointer transition-all">
                                Browse Image
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, "certificate")} />
                              </label>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label
                        className={`flex items-start gap-3 rounded-2xl border p-4 cursor-pointer transition-all ${
                          formValues.isStudentVerified
                            ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-900/50"
                            : "border-amber-300 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900/50"
                        } ${!isEditing ? "opacity-70 pointer-events-none" : ""}`}
                      >
                        <input {...register("isStudentVerified")} type="checkbox" disabled={!isEditing} className="mt-0.5 size-5 rounded accent-emerald-600 shrink-0" />
                        <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 leading-relaxed">
                          I confirm that I am currently a genuine, enrolled Diploma/Degree student at the institution named above, and the certificate uploaded is authentic.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                    <Code className="size-4" /> Skills & Expertise
                  </h3>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500">Skills & Tech Stack</label>
                    <textarea {...register("skills")} placeholder="JavaScript, TypeScript, React, Next.js, Express.js, MongoDB, Git, Postman..." disabled={!isEditing} rows={3} className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 p-4 text-sm font-medium outline-none focus:border-blue-500 transition-all disabled:opacity-70 resize-none" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                    <Briefcase className="size-4" /> Experience / Projects
                  </h3>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500">Experience, Freelance or Personal Projects</label>
                    <textarea {...register("experience")} placeholder="List your internships, freelance work, personal projects, or Open Source contributions here..." disabled={!isEditing} rows={4} className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 p-4 text-sm font-medium outline-none focus:border-blue-500 transition-all disabled:opacity-70 resize-none" />
                  </div>
                </div>
              </>
            )}

            {role === "recruiter" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                  <Briefcase className="size-4" /> Professional Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500">Your Position / Designation</label>
                    <input {...register("recruiterPosition")} disabled={!isEditing} type="text" className="w-full h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 px-4 text-sm font-medium outline-none focus:border-blue-500 transition-all disabled:opacity-70" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold flex items-center gap-1 text-zinc-500"><FaLinkedin className="size-3.5" /> LinkedIn Profile</label>
                    <input {...register("linkedin")} disabled={!isEditing} type="url" className="w-full h-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 px-4 text-sm font-medium outline-none focus:border-blue-500 transition-all disabled:opacity-70" />
                  </div>
                </div>
              </div>
            )}

            <AnimatePresence>
              {isEditing && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="flex justify-end mt-8">
                  <button type="submit" disabled={isSubmitting} className="h-12 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold flex items-center gap-2 transition-all disabled:opacity-50">
                    {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <><Check className="size-4" /> Save Changes</>}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </motion.div>
    </div>
  );
}