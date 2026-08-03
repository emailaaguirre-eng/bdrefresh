# Legacy PHP contact handler (unused by Next.js form)
#
# The live site posts to POST /api/contact (Next.js Route Handler).
# This PHP file remains only as a historical artifact and is not routed by
# Passenger/Next for /contact/send.php (that path currently 404s on Next).
# Do not restore SMTP credentials here — use server env for /api/contact.
