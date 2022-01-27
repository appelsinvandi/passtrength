import {
  RuleGeneratorReturn,
  RuleResultFailInfo,
  RuleResultStatus,
} from '@passtrength/core'

export enum RuleMinLengthFailCode {
  TOO_SHORT = 'TOO_SHORT',
}

interface ResultFailInfoTooShort extends RuleResultFailInfo {
  code: RuleMinLengthFailCode.TOO_SHORT
  meta: {
    /** The minimum allowed password length */
    expected: number
    /** The length of the supplied password */
    found: number
  }
}
type FailInfo = ResultFailInfoTooShort

/**
 * Require the password to be of _at least_ a certain length.
 *
 * ### Advice
 *
 * Logically increasing this number will make the password stronger.
 * However, keep in mind that people have a hard time remembering long passwords,
 * and so to mitigate this they might actually start using less secure passwords,
 * ie. passwords vulnerable to
 * [dictionary attacks](https://en.wikipedia.org/wiki/Dictionary_attack)
 * like "1234567890", or "passwordpassword".
 */
export function passRuleMinLength(
  /**
   * The minimum allowed number of characters in the password.
   */
  minPasswordLength: number
): RuleGeneratorReturn<FailInfo> {
  return (password: string) => {
    if (password.length < minPasswordLength) {
      return {
        status: RuleResultStatus.FAIL,
        info: {
          code: RuleMinLengthFailCode.TOO_SHORT,
          meta: {
            expected: minPasswordLength,
            found: password.length,
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
