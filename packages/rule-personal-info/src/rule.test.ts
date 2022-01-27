import { HofReturnType } from 'types/helpers'

import { RuleResultStatus } from '@passtrength/core'

import { passRulePersonalInformation, PersonalInfo, PersonalInfoType, RulePersonalInfoFailCode } from './rule'

describe('Test with all supported personal info', () => {
  const personalInfoName: PersonalInfo = { type: PersonalInfoType.Text, value: 'Charlie Smith' }
  const personalInfoEmail: PersonalInfo = { type: PersonalInfoType.Email, value: 'funfair1987@gmail.com' }
  const personalInfoPhone: PersonalInfo = { type: PersonalInfoType.PhoneNumber, value: '605-441-7399' }
  const personalInfoUsername: PersonalInfo = { type: PersonalInfoType.Username, value: 'sunshine' }
  const personalInfoBirthday: PersonalInfo = { type: PersonalInfoType.Date, value: new Date('1987-10-04') }

  const rule = passRulePersonalInformation([
    personalInfoName,
    personalInfoEmail,
    personalInfoPhone,
    personalInfoUsername,
    personalInfoBirthday,
  ])

  it(`should allow password: "password"`, () => expect(rule('password').status).toBe(RuleResultStatus.PASS))
  // Name
  it(`should deny password: "charlie"`, () => testInsufficientMatchingCharsFail(rule('charlie'), [personalInfoName]))
  it(`should deny password: "spOnGeChARLiespongE"`, () =>
    testInsufficientMatchingCharsFail(rule('spOnGeChARLiespongE'), [personalInfoName]))
  it(`should deny password: "mynameischarlie"`, () =>
    testInsufficientMatchingCharsFail(rule('mynameischarlie'), [personalInfoName]))
  it(`should deny password: "smith"`, () => testInsufficientMatchingCharsFail(rule('smith'), [personalInfoName]))
  // Email
  it(`should deny password: "funfair"`, () => testInsufficientMatchingCharsFail(rule('funfair'), [personalInfoEmail]))
  it(`should deny password: "1987"`, () =>
    testInsufficientMatchingCharsFail(rule('1987'), [personalInfoEmail, personalInfoBirthday]))
  // Birthday
  it(`should deny password: "041087"`, () => testInsufficientMatchingCharsFail(rule('041087'), [personalInfoBirthday]))
  // Phone number
  it(`should deny password: "441"`, () => testInsufficientMatchingCharsFail(rule('441'), [personalInfoPhone]))
  it(`should deny password: "605"`, () => testInsufficientMatchingCharsFail(rule('605'), [personalInfoPhone]))
  it(`should deny password: "7399"`, () => testInsufficientMatchingCharsFail(rule('7399'), [personalInfoPhone]))
  // Username
  it(`should deny password: "sunshine"`, () =>
    testInsufficientMatchingCharsFail(rule('sunshine'), [personalInfoUsername]))
})

function testInsufficientMatchingCharsFail(
  ruleResult: HofReturnType<typeof passRulePersonalInformation>,
  expectedFound: PersonalInfo[]
) {
  expect(ruleResult.status).toBe(RuleResultStatus.FAIL)
  if (ruleResult.status !== RuleResultStatus.FAIL) return

  expect(ruleResult.info.code).toBe(RulePersonalInfoFailCode.CONTAINS_PERSONAL_INFO)
  expect(ruleResult.info.meta.found).toStrictEqual(expectedFound)
}
