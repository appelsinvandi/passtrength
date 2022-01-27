import { RuleGeneratorReturn, RuleResultFailInfo, RuleResultStatus } from '@passtrength/core'

export enum RuleLowerCaseFailCode {
  INSUFFICIENT_MATCHING_CHARS = 'INSUFFICIENT_MATCHING_CHARS',
}

interface ResultFailInsufficientMatchingChars extends RuleResultFailInfo {
  code: RuleLowerCaseFailCode.INSUFFICIENT_MATCHING_CHARS
  meta: {
    /** The minimum amount of lower case characters that needs to be in the password */
    expected: number
    /** The amount of lower case characters found in the supplied password */
    found: number
  }
}
type FailInfo = ResultFailInsufficientMatchingChars

/**
 * Require the password to include _at least_ a certain amount of lower case characters.
 */
export function passRuleLowerCase(
  /**
   * Minimum amount of lower case characters that need to be in the password for the rule to pass.
   *
   * @default 1
   */
  minLowerCaseChars: number = 1
): RuleGeneratorReturn<FailInfo> {
  const regex = new RegExp(`[a-z]`, 'g')

  return (password) => {
    const match = password.match(regex) ?? []

    if (match.length < minLowerCaseChars) {
      return {
        status: RuleResultStatus.FAIL,
        info: {
          code: RuleLowerCaseFailCode.INSUFFICIENT_MATCHING_CHARS,
          meta: {
            expected: minLowerCaseChars,
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
