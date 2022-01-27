import {
  RuleGeneratorReturn,
  RuleResultFailInfo,
  RuleResultStatus,
} from '@passtrength/core'

export enum RulePersonalInfoFailCode {
  CONTAINS_PERSONAL_INFO = 'CONTAINS_PERSONAL_INFO',
}

interface ResultFailContainsPersonalInfo extends RuleResultFailInfo {
  code: RulePersonalInfoFailCode.CONTAINS_PERSONAL_INFO
  meta: {
    /** An array of personal information found contained in the password */
    found: PersonalInfo[]
  }
}
type FailInfo = ResultFailContainsPersonalInfo

export enum PersonalInfoType {
  /** Any email the user may have provided */
  Email = 'email',
  /** Any username the user may have provided */
  Username = 'username',
  /** Any phone number the user may have provided */
  PhoneNumber = 'phonenumber',

  /** Should be used for any relevant date, like a birthday */
  Date = 'date',
  /**
   * If you have a piece of text provided by the user,
   * but none of the other types fit it, use this one.
   */
  Text = 'text',
  /**
   * If you have a number provided by the user,
   * but none of the other types fit it, use this one.
   */
  Number = 'number',
}

export type PersonalInfo =
  | {
      type: PersonalInfoType.Email | PersonalInfoType.Username | PersonalInfoType.PhoneNumber | PersonalInfoType.Text
      value: string
    }
  | {
      type: PersonalInfoType.Number
      value: number
    }
  | {
      type: PersonalInfoType.Date
      value: Date
    }

/**
 * Require the password to never contain any of the provided personal info.
 */
export function passRulePersonalInformation(
  /**
   * An array of personal information that the user have provided.
   */
  personalInformation: PersonalInfo[]
): RuleGeneratorReturn<FailInfo> {
  return (password: string) => {
    const matches = personalInformation.filter((e) => {
      let components: string[] = []

      if (e.type === PersonalInfoType.Text) {
        components.push(...extractAllComponents(e.value))
      } else if (e.type === PersonalInfoType.Number) {
        components.push(String(e.value))
      } else if (e.type === PersonalInfoType.Email) {
        let emailUsername = e.value.replace(/^(.*?)@.*$/, '$1')

        // Email aliases are like usernames for themselves, and should be treated as a component
        if (emailUsername.includes('+')) {
          const emailAlias = emailUsername.split('+').pop()!
          components.push(...extractAllComponents(emailAlias))
        }
        components.push(...extractAllComponents(emailUsername))
      } else if (e.type === PersonalInfoType.Date) {
        const year = String(e.value.getUTCFullYear())
        const yearEnd = String(e.value.getUTCFullYear()).slice(-2)
        const month = String(e.value.getUTCMonth() + 1).padStart(2, '0')
        const day = String(e.value.getUTCDate()).padStart(2, '0')

        components.push(
          year,
          yearEnd,
          month + day,
          day + month,
          month + day + yearEnd,
          day + month + yearEnd,
          yearEnd + month + day,
          yearEnd + day + month
        )
      } else if (e.type === PersonalInfoType.PhoneNumber) {
        let cleanNumber = extractNumberComponents(e.value).join('')

        // Split up the number into groups of 3 digits, as any below might easily cause a false positive
        for (let i = 0; i < cleanNumber.length - 3; i++) {
          components.push(cleanNumber.slice(i, i + 3))
        }
      } else if (e.type === PersonalInfoType.Username) {
        components.push(...extractAllComponents(e.value))
      }

      return components.some((component) => password.toLowerCase().includes(component.toLowerCase()))
    })

    if (matches.length > 0) {
      return {
        status: RuleResultStatus.FAIL,
        info: {
          code: RulePersonalInfoFailCode.CONTAINS_PERSONAL_INFO,
          meta: {
            found: matches,
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

function extractAllComponents(info: string) {
  return [...extractTextComponents(info), ...extractNumberComponents(info)]
}

function extractTextComponents(info: string) {
  const regexp = /[a-zA-Z]+/g
  let match
  let acc: string[] = []
  while ((match = regexp.exec(info)) !== null) {
    acc.push(match[0])
  }

  return acc
}

function extractNumberComponents(info: string) {
  const regexp = /\d+/g
  let match
  let acc: string[] = []
  while ((match = regexp.exec(info)) !== null) {
    acc.push(match[0])
  }

  return acc
}
