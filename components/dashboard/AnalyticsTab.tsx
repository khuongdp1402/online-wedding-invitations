"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Eye,
  Users,
  MessageSquare,
  CheckCircle,
  TrendingUp,
  Calendar,
  Globe,
} from "lucide-react";

type Props = {
  analytics: {
    viewCount: number;
    guestCount: number;
    wishCount: number;
    acceptedCount: number;
    declinedCount: number;
    pendingCount: number;
    totalAttendees: number;
    linkOpenedCount: number;
    createdAt: string;
    publishedAt: string | null;
    slug: string;
  };
};

export function AnalyticsTab({ analytics }: Props) {
  const daysSinceCreated = Math.floor(
    (Date.now() - new Date(analytics.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  const avgViewsPerDay = daysSinceCreated > 0
    ? (analytics.viewCount / daysSinceCreated).toFixed(1)
    : analytics.viewCount;

  const responseRate = analytics.guestCount > 0
    ? Math.round(((analytics.acceptedCount + analytics.declinedCount) / analytics.guestCount) * 100)
    : 0;

  const linkOpenRate = analytics.guestCount > 0
    ? Math.round((analytics.linkOpenedCount / analytics.guestCount) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Key metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          icon={Eye}
          iconColor="text-blue-500"
          label="Tổng lượt xem"
          value={analytics.viewCount}
        />
        <MetricCard
          icon={Users}
          iconColor="text-emerald-500"
          label="Tổng khách mời"
          value={analytics.guestCount}
        />
        <MetricCard
          icon={MessageSquare}
          iconColor="text-amber-500"
          label="Lời chúc"
          value={analytics.wishCount}
        />
        <MetricCard
          icon={CheckCircle}
          iconColor="text-rose-500"
          label="Xác nhận tham dự"
          value={analytics.acceptedCount}
        />
      </div>

      {/* Detailed stats */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Engagement */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Mức độ tương tác
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <StatRow label="Trung bình lượt xem/ngày" value={String(avgViewsPerDay)} />
            <StatRow
              label="Tỷ lệ phản hồi RSVP"
              value={`${responseRate}%`}
              bar={responseRate}
              barColor="bg-blue-500"
            />
            <StatRow
              label="Tỷ lệ mở link mời"
              value={`${linkOpenRate}%`}
              bar={linkOpenRate}
              barColor="bg-emerald-500"
            />
            <StatRow label="Số ngày kể từ tạo" value={`${daysSinceCreated} ngày`} />
          </CardContent>
        </Card>

        {/* RSVP breakdown */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-500" />
              Phân bổ khách mời
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <StatRow
              label="Tham dự"
              value={`${analytics.acceptedCount} khách (${analytics.totalAttendees} người)`}
              bar={analytics.guestCount > 0 ? Math.round((analytics.acceptedCount / analytics.guestCount) * 100) : 0}
              barColor="bg-green-500"
            />
            <StatRow
              label="Từ chối"
              value={`${analytics.declinedCount} khách`}
              bar={analytics.guestCount > 0 ? Math.round((analytics.declinedCount / analytics.guestCount) * 100) : 0}
              barColor="bg-red-400"
            />
            <StatRow
              label="Chưa phản hồi"
              value={`${analytics.pendingCount} khách`}
              bar={analytics.guestCount > 0 ? Math.round((analytics.pendingCount / analytics.guestCount) * 100) : 0}
              barColor="bg-yellow-400"
            />
            <StatRow
              label="Link đã mở"
              value={`${analytics.linkOpenedCount}/${analytics.guestCount} khách`}
            />
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            Thông tin
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Ngày tạo</span>
            <span className="font-medium">{new Date(analytics.createdAt).toLocaleDateString("vi-VN")}</span>
          </div>
          {analytics.publishedAt && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Ngày xuất bản</span>
              <span className="font-medium">{new Date(analytics.publishedAt).toLocaleDateString("vi-VN")}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Đường dẫn</span>
            <span className="font-medium font-mono flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" /> /w/{analytics.slug}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  iconColor,
  label,
  value,
}: {
  icon: React.ElementType;
  iconColor: string;
  label: string;
  value: number;
}) {
  return (
    <Card>
      <CardContent className="pt-4 pb-4">
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${iconColor}`} />
          <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-lg font-bold">{value.toLocaleString("vi-VN")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatRow({
  label,
  value,
  bar,
  barColor,
}: {
  label: string;
  value: string;
  bar?: number;
  barColor?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="text-sm font-medium">{value}</span>
      </div>
      {bar !== undefined && barColor && (
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className={`${barColor} h-2 rounded-full transition-all`}
            style={{ width: `${Math.min(bar, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}
