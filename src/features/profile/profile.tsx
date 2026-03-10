import { useForm } from "react-hook-form";
import { useAuth } from "../auth/context/auth.context";
import "./profile.scss";
import { useEffect, useMemo, useState } from "react";
import {
  USER_SCHEMA,
  type UserFormData,
} from "../auth/validators/user.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUser } from "../../shared/services/user.queries";
import { ENV } from "../../environment/env.local";
import { Button } from "@/components/ui/button";

type StatsMode = "monthly" | "yearly";
type ChartPoint = {
  label: string;
  likes: number;
  downloads: number;
  donations: number;
};

function generateData(mode: StatsMode): ChartPoint[] {
  const labelsMonthly = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const labelsYearly = ["2021", "2022", "2023", "2024", "2025", "2026"];
  const labels = mode === "monthly" ? labelsMonthly : labelsYearly;
  const multiplier = mode === "monthly" ? 1 : 8;

  return labels.map((label, index) => ({
    label,
    likes: Math.floor((60 + Math.random() * 220 + index * 8) * multiplier),
    downloads: Math.floor((120 + Math.random() * 460 + index * 15) * multiplier),
    donations: Math.floor((8 + Math.random() * 40 + index * 2) * multiplier),
  }));
}

function Profile() {
  const { user } = useAuth();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<StatsMode>("monthly");
  const { mutate: updateUser } = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(USER_SCHEMA),
  });

  const chartData = useMemo(() => generateData(mode), [mode]);

  const totals = useMemo(
    () => ({
      likes: chartData.reduce((acc, item) => acc + item.likes, 0),
      downloads: chartData.reduce((acc, item) => acc + item.downloads, 0),
      donations: chartData.reduce((acc, item) => acc + item.donations, 0),
    }),
    [chartData],
  );

  const maxValue = useMemo(
    () =>
      Math.max(
        ...chartData.map((item) =>
          Math.max(item.likes, item.downloads, item.donations),
        ),
      ),
    [chartData],
  );

  useEffect(() => {
    if (user) {
      reset({
        email: user.email ?? "",
        userName: user.userName ?? "",
      });
    }
  }, [reset, user]);

  const previewSrc = preview ?? (user?.avatar ? ENV.API_URL + "/" + user.avatar : null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const onSubmit = (data: UserFormData) => {
    const formData = new FormData();
    if (file) {
      formData.append("objectFile", file);
    }

    formData.append("email", data.email);
    formData.append("userName", data.userName);
    formData.append("avatar", user?.avatar ?? "");

    updateUser(formData, {
      onSuccess: (res) => {
        cancelChanges();
        const result = res.userUpdated;
        if (result.statusCode === 200) {
          if (result?.data.avatar) {
            setPreview(ENV.API_URL + "/" + result.data.avatar);
          } else {
            setPreview(null);
            setFile(null);
          }
        }
      },
    });
  };

  const cancelChanges = () => {
    if (user) {
      reset({
        email: user.email ?? "",
        userName: user.userName ?? "",
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-background p-4 md:p-6 text-foreground">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-4">
        <form
          className="rounded-2xl border border-border bg-card p-5 md:p-6 h-fit shadow-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-center gap-4 mb-7">
            <h2 className="uppercase text-xs tracking-wide text-muted-foreground">
              Photographer profile
            </h2>
            <label
              htmlFor="photo"
              className="relative w-44 h-44 rounded-full border-2 border-dashed border-border bg-muted/30 flex items-center justify-center cursor-pointer overflow-hidden hover:border-ring transition"
              title="Upload photo"
            >
              {previewSrc ? (
                <img
                  src={previewSrc ?? undefined}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="text-5xl text-muted-foreground">+</div>
              )}
              <input
                id="photo"
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                {...register("email")}
                className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/40"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                {...register("userName")}
                className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/40"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              type="button"
              onClick={cancelChanges}
              variant="outline"
              size="lg"
              className="button-reset h-10 rounded-xl px-5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              className="button-reset h-10 rounded-xl px-5 text-sm font-semibold"
            >
              Save
            </Button>
          </div>
        </form>

        <section className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-base font-semibold">
                Popularity analytics (demo)
              </h3>
              <p className="text-sm text-muted-foreground">
                Random test numbers for likes, downloads and donations.
              </p>
            </div>
            <div className="inline-flex rounded-lg border border-border p-1 bg-muted">
              <button
                type="button"
                onClick={() => setMode("monthly")}
                className={`button-reset h-8 px-3 text-xs rounded-md ${
                  mode === "monthly"
                    ? "bg-background shadow text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setMode("yearly")}
                className={`button-reset h-8 px-3 text-xs rounded-md ${
                  mode === "yearly"
                    ? "bg-background shadow text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground">Likes</p>
              <p className="text-xl font-semibold">
                {totals.likes.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground">Downloads</p>
              <p className="text-xl font-semibold">
                {totals.downloads.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground">Donations</p>
              <p className="text-xl font-semibold">
                ${totals.donations.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border p-4">
            <div className="h-72 flex items-end gap-2">
              {chartData.map((item) => (
                <div key={item.label} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end justify-center gap-1 h-56">
                    <div
                      className="w-1/3 rounded-t bg-blue-500/90"
                      style={{ height: `${(item.likes / maxValue) * 100}%` }}
                      title={`Likes: ${item.likes}`}
                    />
                    <div
                      className="w-1/3 rounded-t bg-slate-600/90"
                      style={{ height: `${(item.downloads / maxValue) * 100}%` }}
                      title={`Downloads: ${item.downloads}`}
                    />
                    <div
                      className="w-1/3 rounded-t bg-emerald-500/90"
                      style={{ height: `${(item.donations / maxValue) * 100}%` }}
                      title={`Donations: ${item.donations}`}
                    />
                  </div>
                  <span className="text-[11px] text-muted-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-blue-500" />
                Likes
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-600" />
                Downloads
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-500" />
                Donations
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
