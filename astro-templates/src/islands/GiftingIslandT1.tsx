import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Copy, CreditCard, Home, Phone, ChevronDown, ChevronUp } from "lucide-react";

function buildVietQrUrl({
  bankName,
  accountNumber,
  accountHolder,
  message,
}: {
  bankName: string;
  accountNumber: string;
  accountHolder?: string;
  message?: string;
}) {
  if (!bankName || !accountNumber) return "";
  const cleanBankName = bankName.trim();
  const cleanAccountNumber = accountNumber.trim().replace(/\s+/g, "");
  let qrUrl = `https://img.vietqr.io/image/${cleanBankName}-${cleanAccountNumber}-compact.png`;

  const queryParams = new URLSearchParams();
  if (accountHolder) {
    queryParams.append("accountName", accountHolder);
  }
  if (message) {
    queryParams.append("addInfo", message);
  }

  const queryString = queryParams.toString();
  if (queryString) {
    qrUrl += `?${queryString}`;
  }

  return qrUrl;
}

export function GiftingIslandT1({ data }: { data: any }) {
  const [showDetails, setShowDetails] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const gifting = data.gifting;

  const groomQrUrl = buildVietQrUrl({
    bankName: gifting?.groom?.bankName ?? "",
    accountNumber: gifting?.groom?.accountNumber ?? "",
    accountHolder: gifting?.groom?.accountName,
    message: "Mung cuoi",
  });
  const brideQrUrl = buildVietQrUrl({
    bankName: gifting?.bride?.bankName ?? "",
    accountNumber: gifting?.bride?.accountNumber ?? "",
    accountHolder: gifting?.bride?.accountName,
    message: "Mung cuoi",
  });

  const hasGroom = Boolean(gifting?.groom?.accountNumber?.trim());
  const hasBride = Boolean(gifting?.bride?.accountNumber?.trim());
  if (!gifting || (!hasGroom && !hasBride)) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="qua-tang" className="bg-[#FDFBF7] overflow-hidden py-16">
      <div className="container mx-auto max-w-5xl px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Gift className="w-10 h-10 text-burgundy opacity-40" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading text-ink-dark leading-tight mb-4">
              Gửi Quà Yêu Thương
            </h2>
            <div className="h-px w-16 bg-gold mx-auto mb-6" />
            <p className="text-sm sm:text-base text-ink/60 leading-relaxed max-w-lg mx-auto italic font-medium">
              Sự hiện diện của bạn là món quà lớn nhất. <br className="hidden sm:block" />
              Nếu bạn muốn dành tặng một món quà ý nghĩa, tụi mình xin trân trọng cảm ơn.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDetails(!showDetails)}
              className="group flex items-center gap-3 px-10 py-4 bg-burgundy text-white text-[10px] tracking-[0.4em] uppercase font-bold transition-all shadow-xl hover:bg-burgundy-dark"
            >
              {showDetails ? "Thu gọn thông tin" : "Xem thông tin gửi quà"}
              {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden mt-12"
            >
              <div className={`grid gap-8 lg:gap-12 ${hasGroom && hasBride ? "md:grid-cols-2" : "max-w-md mx-auto"}`}>
                {/* Groom's Gift Card */}
                {hasGroom && (
                  <div className="bg-white/60 backdrop-blur-md rounded-[32px] border border-gold/10 p-8 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05),0_4px_10px_-5px_rgba(128,0,32,0.02)] flex flex-col items-center">
                    <div className="mb-6 text-center">
                      <p className="text-[10px] tracking-[0.3em] uppercase text-burgundy font-bold mb-2">Chú rể</p>
                      <p className="text-xl font-heading text-ink-dark font-bold">{data.groom.name}</p>
                    </div>

                    {groomQrUrl && (
                      <div className="bg-white p-4 rounded-2xl shadow-inner border border-gold/5 mb-6 relative group overflow-hidden">
                        <img
                          src={groomQrUrl}
                          alt="QR Mã Chú Rể"
                          className="w-40 h-40 sm:w-48 sm:h-48 object-contain opacity-90 transition-opacity group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                    )}

                    <div className="w-full space-y-4">
                      {/* Bank Info */}
                      <div className="p-4 rounded-xl bg-burgundy/[0.03] border border-burgundy/5 flex items-center justify-between group hover:bg-burgundy/[0.05] transition-colors">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-burgundy/60" />
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-ink/60 font-bold">{gifting.groom.bankName}</p>
                            <p className="text-base font-bold text-ink-dark">{gifting.groom.accountNumber}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(gifting.groom.accountNumber, 'groom-bank')}
                          className="hover:text-burgundy text-ink/50 transition-colors"
                        >
                          <Copy className={`w-4 h-4 ${copiedId === 'groom-bank' ? 'text-burgundy scale-125' : ''} transition-transform`} />
                        </button>
                      </div>

                      {/* Shipping Info */}
                      <div className="p-4 rounded-xl bg-gold/[0.03] border border-gold/10 space-y-3">
                        {gifting.groom.address && (
                          <div className="flex items-start gap-3">
                            <Home className="w-5 h-5 text-gold/60 mt-0.5" />
                            <p className="text-sm text-ink leading-relaxed font-medium">{gifting.groom.address}</p>
                          </div>
                        )}
                        {gifting.groom.phone && (
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-gold/60" />
                            <p className="text-sm text-ink-dark font-bold">{gifting.groom.phone}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Bride's Gift Card */}
                {hasBride && (
                  <div className="bg-white/60 backdrop-blur-md rounded-[32px] border border-gold/10 p-8 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05),0_4px_10px_-5px_rgba(128,0,32,0.02)] flex flex-col items-center">
                    <div className="mb-6 text-center">
                      <p className="text-[10px] tracking-[0.3em] uppercase text-burgundy font-bold mb-2">Cô dâu</p>
                      <p className="text-xl font-heading text-ink-dark font-bold">{data.bride.name}</p>
                    </div>

                    {brideQrUrl && (
                      <div className="bg-white p-4 rounded-2xl shadow-inner border border-gold/5 mb-6 relative group overflow-hidden">
                        <img
                          src={brideQrUrl}
                          alt="QR Mã Cô Dâu"
                          className="w-40 h-40 sm:w-48 sm:h-48 object-contain opacity-90 transition-opacity group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                    )}

                    <div className="w-full space-y-4">
                      {/* Bank Info */}
                      <div className="p-4 rounded-xl bg-burgundy/[0.03] border border-burgundy/5 flex items-center justify-between group hover:bg-burgundy/[0.05] transition-colors">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-burgundy/60" />
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-ink/60 font-bold">{gifting.bride.bankName}</p>
                            <p className="text-base font-bold text-ink-dark">{gifting.bride.accountNumber}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(gifting.bride.accountNumber, 'bride-bank')}
                          className="hover:text-burgundy text-ink/50 transition-colors"
                        >
                          <Copy className={`w-4 h-4 ${copiedId === 'bride-bank' ? 'text-burgundy scale-125' : ''} transition-transform`} />
                        </button>
                      </div>

                      {/* Shipping Info */}
                      <div className="p-4 rounded-xl bg-gold/[0.03] border border-gold/10 space-y-3">
                        {gifting.bride.address && (
                          <div className="flex items-start gap-3">
                            <Home className="w-5 h-5 text-gold/60 mt-0.5" />
                            <p className="text-sm text-ink leading-relaxed font-medium">{gifting.bride.address}</p>
                          </div>
                        )}
                        {gifting.bride.phone && (
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-gold/60" />
                            <p className="text-sm text-ink-dark font-bold">{gifting.bride.phone}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
