import {
  RuleGeneratorReturn,
  RuleResultFailInfo,
  RuleResultStatus,
} from '@passtrength/core'

export enum RuleUpperCaseFailCode {
  INSUFFICIENT_MATCHING_CHARS = 'INSUFFICIENT_MATCHING_CHARS',
}

interface ResultFailInsufficientMatchingChars extends RuleResultFailInfo {
  code: RuleUpperCaseFailCode.INSUFFICIENT_MATCHING_CHARS
  meta: {
    /** The minimum amount of upper case characters that needs to be in the password */
    expected: number
    /** The amount of upper case characters found in the supplied password */
    found: number
  }
}
type FailInfo = ResultFailInsufficientMatchingChars

/**
 * Require the password to include _at least_ a certain amount of upper case characters.
 */
export function passRuleUpperCase(
  /** 
   * Minimum amount of upper case characters that need to be in the password for the rule to pass.
   * 
   * @default 1
   */
  minUpperCaseChars: number = 1
): RuleGeneratorReturn<FailInfo> {
  const regex = new RegExp(`[A-Z]`, 'g')

  return (password) => {
    const match = password.match(regex) ?? []

    if (match.length < minUpperCaseChars) {
      return {
        status: RuleResultStatus.FAIL,
        info: {
          code: RuleUpperCaseFailCode.INSUFFICIENT_MATCHING_CHARS,
          meta: {
            expected: minUpperCaseChars,
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
