// Thay placeholder "quý khách" bằng tên khách thật nếu URL có
// ?name=/?guest= và/hoặc ?salutation=/?xung_ho= — xem QuoteStatic.astro.
// HTML build sẵn dùng chung mọi khách nên không thể chèn tên lúc build.
const params = new URLSearchParams(window.location.search);
const guestName = params.get("guest") || params.get("name");
const guestSalutation = params.get("salutation") || params.get("xung_ho");

if (guestName || guestSalutation) {
  const inviteeLabel = guestSalutation && guestName ? `${guestSalutation} ${guestName}` : guestName;
  const salutationOnly = guestSalutation || guestName;

  document.querySelectorAll("[data-guest-invitee-label]").forEach((el) => {
    if (inviteeLabel) el.textContent = inviteeLabel;
  });
  document.querySelectorAll("[data-guest-salutation-label]").forEach((el) => {
    if (salutationOnly) el.textContent = salutationOnly;
  });
}
