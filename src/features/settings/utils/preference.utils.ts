import type { PreferenceJSON } from "../DTOs/preference.dto";
import { getDefaultPreference } from "../DTOs/preference.dto";

type PreferencePatch = Partial<PreferenceJSON> & {
  predispositions?: Partial<PreferenceJSON["predispositions"]>;
  notifications?: Partial<PreferenceJSON["notifications"]>;
  privacy?: Partial<PreferenceJSON["privacy"]>;
};

export function getMergedPreference(
  currentPreference: Partial<PreferenceJSON> | null | undefined,
  patch: PreferencePatch,
): PreferenceJSON {
  const base = {
    ...getDefaultPreference(),
    ...(currentPreference ?? {}),
  };

  return {
    ...base,
    ...patch,
    predispositions: {
      ...base.predispositions,
      ...(patch.predispositions ?? {}),
    },
    notifications: {
      ...base.notifications,
      ...(patch.notifications ?? {}),
    },
    privacy: {
      ...base.privacy,
      ...(patch.privacy ?? {}),
    },
  };
}

