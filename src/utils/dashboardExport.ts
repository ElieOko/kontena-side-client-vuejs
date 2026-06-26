import type {
  DashboardStats,
  GrowthPoint,
  PlatformUser,
  TopThemesByPeriod,
  UserGrowthStats,
} from '@/utils/service/dashboardApi';
import { formatPhoneNumber } from '@/utils/service/dashboardApi';

const escapeCsv = (value: string | number | null | undefined): string => {
  const text = value == null ? '' : String(value);
  if (text.includes(';') || text.includes('"') || text.includes('\n')) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
};

const row = (...cells: (string | number | null | undefined)[]): string =>
  cells.map(escapeCsv).join(';');

export interface DashboardExportData {
  periodLabel: string;
  dateFrom: string;
  dateTo: string;
  stats: DashboardStats | null;
  growth: UserGrowthStats | null;
  topThemes: TopThemesByPeriod | null;
  users: PlatformUser[];
}

export const buildDashboardCsv = (data: DashboardExportData): string => {
  const lines: string[] = [
    row('Solola Admin - Export statistiques'),
    row('Période', data.periodLabel),
    row('Date début', data.dateFrom || '—'),
    row('Date fin', data.dateTo || '—'),
    '',
    row('=== RÉSUMÉ ==='),
    row('Indicateur', 'Valeur'),
    row('Utilisateurs uniques', data.stats?.users.total_unique_users ?? 0),
    row('Messages analysés', data.stats?.themes.total ?? 0),
    '',
    row('=== RÉPARTITION PAR GENRE ==='),
    row('Genre', 'Nombre'),
  ];

  for (const item of data.stats?.gender.items ?? []) {
    lines.push(row(item.label, item.count));
  }

  lines.push('', row('=== THÈMES CONSULTÉS ==='), row('Thème', 'Nombre'));
  for (const item of data.stats?.themes.items ?? []) {
    if (item.count > 0) {
      lines.push(row(item.label, item.count));
    }
  }

  if (data.topThemes?.items.length) {
    lines.push('', row('=== THÈMES LEADERS ==='), row('Période', 'Thème', 'Consultations'));
    for (const item of data.topThemes.items) {
      lines.push(row(item.period_label, item.theme, item.count));
    }
  }

  if (data.growth?.items.length) {
    lines.push('', row('=== CROISSANCE UTILISATEURS ==='), row('Date', 'Nouveaux', 'Cumul'));
    for (const point of data.growth.items) {
      lines.push(row(point.label, point.new_users, point.cumulative_users));
    }
  }

  if (data.users.length) {
    lines.push(
      '',
      row('=== UTILISATEURS ==='),
      row('Téléphone', 'Genre', 'Messages', 'Première visite', 'Dernière activité'),
    );
    for (const user of data.users) {
      lines.push(
        row(
          formatPhoneNumber(user.phone_number),
          user.gender,
          user.messages_count,
          user.first_seen ?? '',
          user.last_seen ?? '',
        ),
      );
    }
  }

  return `\uFEFF${lines.join('\n')}`;
};

export const downloadCsv = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
