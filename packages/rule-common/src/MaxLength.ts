import { RuleGeneratorReturn, RuleResultFailInfo, RuleResultStatus } from '@passtrength/core'

export enum RuleMaxLengthFailCode {
  TOO_LONG = 'TOO_LONG',
}

interface ResultFailInfoTooLong extends RuleResultFailInfo {
  code: RuleMaxLengthFailCode.TOO_LONG
  meta: {
    /** The maximum allowed password length */
    expected: number
    /** The length of the supplied password */
    found: number
  }
}
type FailInfo = ResultFailInfoTooLong

/**
 * Require the password to be of _at most_ a certain length.
 */
export function passRuleMaxLength(
  /**
   * The maximum allowed length of the password.
   */
  maxPasswordLength: number
): RuleGeneratorReturn<FailInfo> {
  return (password: string) => {
    if (password.length > maxPasswordLength) {
      return {
        status: RuleResultStatus.FAIL,
        info: {
          code: RuleMaxLengthFailCode.TOO_LONG,
          meta: {
            expected: maxPasswordLength,
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
