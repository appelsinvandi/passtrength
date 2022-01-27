import {
  RuleGeneratorReturn,
  RuleResultFailInfo,
  RuleResultStatus,
} from '@passtrength/core'

export enum RuleNonStandardCharactersFailCode {
  INSUFFICIENT_MATCHING_CHARS = 'INSUFFICIENT_MATCHING_CHARS',
}

interface ResultFailInsufficientMatchingChars extends RuleResultFailInfo {
  code: RuleNonStandardCharactersFailCode.INSUFFICIENT_MATCHING_CHARS
  meta: {
    /** The minimum amount of non-standard characters that needs to be in the password */
    expected: number
    /** The amount of non-standard characters found in the supplied password */
    found: number
  }
}
type FailInfo = ResultFailInsufficientMatchingChars

/**
 * Require the password to include _at least_ a certain amount of non-standard character.
 *
 * A non-standard character is in this case defined as anything that isn't `a-z`, `A-Z`, or `0-9`.
 */
export function passRuleNonStandardCharacters(
  /**
   * Minimum amount of non-standard characters that need to be in the password for the rule to pass.
   *
   * @default 1
   */
  minNonStandardChars: number = 1
): RuleGeneratorReturn<FailInfo> {
  const regex = new RegExp(`[^A-Za-z0-9]`, 'g')

  return (password: string) => {
    const match = password.match(regex) ?? []

    if (match.length < minNonStandardChars) {
      return {
        status: RuleResultStatus.FAIL,
        info: {
          code: RuleNonStandardCharactersFailCode.INSUFFICIENT_MATCHING_CHARS,
          meta: {
            expected: minNonStandardChars,
            found: match.length,
          },
        },
      }
    } else {
      return {
        status: RuleResultStatus.PASS,
      }
    }
  }
}
