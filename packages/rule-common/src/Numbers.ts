import {
  RuleGeneratorReturn,
  RuleResultFailInfo,
  RuleResultStatus,
} from '@passtrength/core'

export enum RuleNumbersFailCode {
  INSUFFICIENT_NUMBERS = 'INSUFFICIENT_NUMBERS',
}

interface ResultFailInsufficientNumbers extends RuleResultFailInfo {
  code: RuleNumbersFailCode.INSUFFICIENT_NUMBERS
  meta: {
    /** The minimum amount of numbers that needs to be in the password */
    expected: number
    /** The amount of numbers found in the supplied password */
    found: number
  }
}
type FailInfo = ResultFailInsufficientNumbers

/**
 * Require the password to include _at least_ a certain amount of numbers.
 */
export function passRuleNumbers(
  /** 
   * Minimum amount of numbers that need to be in the password for the rule to pass.
   * 
   * @default 1
   */
  minNumbers: number = 1): RuleGeneratorReturn<FailInfo> {
  const regex = new RegExp(`[0-9]`, 'g')

  return (password: string) => {
    const match = password.match(regex) ?? []

    if (match.length < minNumbers) {
      return {
        status: RuleResultStatus.FAIL,
        info: {
          code: RuleNumbersFailCode.INSUFFICIENT_NUMBERS,
          meta: {
            expected: minNumbers,
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
