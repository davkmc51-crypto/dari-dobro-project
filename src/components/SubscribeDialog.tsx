import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { ORG } from '@/data/site';

interface SubscribeDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

const WIDGET_SID = '3c821d75-4b3b-4a47-a437-bf6d77af73f2';
const WIDGET_SRC = `https://widgets.donation.ru/wloader/${WIDGET_SID}/wloader.js`;

export const SubscribeDialog = ({ open, onOpenChange }: SubscribeDialogProps) => {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    if (document.querySelector(`script[src="${WIDGET_SRC}"]`)) return;
    const script = document.createElement('script');
    script.src = WIDGET_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 transition-opacity duration-200 sm:p-6 ${
        open ? 'opacity-100' : 'pointer-events-none invisible opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Оформить ежемесячную подписку"
    >
      <div
        className="fixed inset-0 bg-foreground/60"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      <div className="relative my-auto w-full max-w-xl rounded-[var(--hero-radius)] bg-card p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Оформить подписку</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Выберите комфортную ежемесячную сумму — пусть добро происходит регулярно.
            </p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            aria-label="Закрыть"
            className="shrink-0 rounded-[var(--hero-radius)] p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="mt-6" id={WIDGET_SID} data-d7wl-dispatched="true" />

        <p className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
          <Icon name="ShieldCheck" size={16} className="mt-0.5 shrink-0 text-accent" />
          Платежи проводятся через сервис donation.ru. Нажимая кнопку оплаты, вы принимаете условия
          публичной оферты. Получатель: {ORG.full}, ИНН {ORG.inn}.
        </p>
      </div>
    </div>
  );
};

export default SubscribeDialog;
