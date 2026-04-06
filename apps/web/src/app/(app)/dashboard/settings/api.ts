export async function deleteJournalData(): Promise<void> {
  const response = await fetch("/api/settings/delete-journal", {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete journal data.");
  }
}

export async function deleteAccountData(): Promise<void> {
  const response = await fetch("/api/settings/delete-account", {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete account.");
  }
}
