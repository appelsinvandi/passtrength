import { RuleGeneratorReturn, RuleResultFailInfo, RuleResultStatus } from '@passtrength/core'

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
 * @param minPasswordLength The minimum allowed length of the password
 */
export function passRuleMinLength(minPasswordLength: number): RuleGeneratorReturn<FailInfo> {
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
