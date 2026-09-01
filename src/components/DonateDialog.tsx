import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { FUNDRAISERS, ORG } from '@/data/site';
import { toast } from '@/hooks/use-toast';

interface DonateDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

const AMOUNTS = [300, 500, 1000, 3000];

export const DonateDialog = ({ open, onOpenChange }: DonateDialogProps) => {
  const [amount, setAmount] = useState(500);
  const [custom, setCustom] = useState('');
  const [target, setTarget] = useState('Наибольшая нужда');
  const [monthly, setMonthly] = useState(false);

  const value = custom ? Number(custom.replace(/\D/g, '')) : amount;

  const submit = () => {
    if (!value || value < 50) {
      toast({ title: 'Минимальная сумма — 50 ₽', description: 'Укажите сумму пожертвования.' });
      return;
    }
    onOpenChange(false);
    toast({
      title: 'Спасибо за вашу помощь!',
      description: `Пожертвование ${value.toLocaleString('ru-RU')} ₽${
        monthly ? ' ежемесячно' : ''
      } · ${target}. Платёжный виджет donation.ru подключим на этапе запуска.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-[var(--hero-radius)] bg-card">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold">Сделать пожертвование</DialogTitle>
          <DialogDescription>
            Любая сумма помогает. Отчёт о расходовании публикуем в разделе «Документы и отчёты».
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-1">
          <div>
            <div className="mb-2 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">Сумма</div>
            <div className="flex flex-wrap gap-2">
              {AMOUNTS.map((a) => (
                <button
                  key={a}
                  onClick={() => {
                    setAmount(a);
                    setCustom('');
                  }}
                  className={`rounded-[var(--hero-radius)] px-4 py-2.5 text-sm font-medium transition-colors ${
                    !custom && amount === a
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-foreground hover:bg-secondary hover:text-secondary-foreground'
                  }`}
                >
                  {a.toLocaleString('ru-RU')} ₽
                </button>
              ))}
              <input
                value={custom}
                onChange={(e) => setCustom(e.target.value.replace(/\D/g, ''))}
                placeholder="Своя сумма"
                inputMode="numeric"
                className="w-32 rounded-[var(--hero-radius)] bg-muted px-4 py-2.5 text-sm outline-none ring-accent placeholder:text-muted-foreground focus:ring-1"
              />
            </div>
          </div>

          <div>
            <div className="mb-2 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
              Назначение
            </div>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full rounded-[var(--hero-radius)] bg-muted px-4 py-3 text-sm outline-none ring-accent focus:ring-1"
            >
              <option>Наибольшая нужда</option>
              {FUNDRAISERS.map((f) => (
                <option key={f.title}>{f.title}</option>
              ))}
            </select>
          </div>

          <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
            <input
              type="checkbox"
              checked={monthly}
              onChange={(e) => setMonthly(e.target.checked)}
              className="h-4 w-4 accent-[var(--hero-accent)]"
            />
            Повторять ежемесячно — самая устойчивая помощь
          </label>

          <button
            onClick={submit}
            className="w-full rounded-[var(--hero-radius)] bg-accent px-6 py-3.5 font-semibold text-accent-foreground transition-transform hover:scale-[1.01]"
          >
            Пожертвовать {value ? `${value.toLocaleString('ru-RU')} ₽` : ''}
          </button>

          <p className="flex items-start gap-2 text-xs text-muted-foreground">
            <Icon name="ShieldCheck" size={16} className="mt-0.5 shrink-0 text-accent" />
            Платежи проводятся через сервис donation.ru. Нажимая кнопку, вы принимаете условия публичной
            оферты. Получатель: {ORG.full}, ИНН {ORG.inn}.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonateDialog;
