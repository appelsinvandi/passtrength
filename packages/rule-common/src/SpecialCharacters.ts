import {
  RuleGeneratorReturn,
  RuleResultFailInfo,
  RuleResultStatus,
} from '@passtrength/core'

export enum RuleSpecialCharsFailCode {
  INSUFFICIENT_SPECIAL_CHARS = 'INSUFFICIENT_SPECIAL_CHARS',
}

interface ResultFailInsufficientSpecialChars extends RuleResultFailInfo {
  code: RuleSpecialCharsFailCode.INSUFFICIENT_SPECIAL_CHARS
  meta: {
    /** The minimum amount of special characters that needs to be in the password */
    expected: number
    /** The amount of special characters found in the supplied password */
    found: number
  }
}
type FailInfo = ResultFailInsufficientSpecialChars

/**
 * Require the password to include _at least_ a certain amount of special characters.
 */
export function passRuleSpecialCharacters(
  /**
   * Minimum amount of special characters that need to be in the password for the rule to pass.
   *
   * @default 1
   */
  minSpecialChars: number = 1,
  /**
   * A string containing all the characters considered special characters for the purpose of this rule.
   *
   * @default ` !"#$%&'()*+,-./:;<=>?@[]^_{|}~`
   */
  allowedChars: string = ' !"#$%&\'()*+,-./:;<=>?@[]^_{|}~'
): RuleGeneratorReturn<FailInfo> {
  // Escape only special characters - Avoids match sequences
  const escapedAllowedChars = allowedChars.replace(/[^a-zA-Z0-9]/gi, (c) => `\\${c}`)
  const regex = new RegExp(`[${escapedAllowedChars}]`, 'g')

  return (password: string) => {
    const match = password.match(regex) ?? []

    if (match.length < minSpecialChars) {
      return {
        status: RuleResultStatus.FAIL,
        info: {
          code: RuleSpecialCharsFailCode.INSUFFICIENT_SPECIAL_CHARS,
          meta: {
            expected: minSpecialChars,
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
