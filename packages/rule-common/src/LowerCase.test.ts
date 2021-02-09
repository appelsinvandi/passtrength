import { RuleResultStatus } from '@passtrength/core'
import { HofReturnType } from 'types/helpers'
import { passRuleLowerCase, RuleLowerCaseFailCode } from './LowerCase'

describe('Support using zero (0) lower case characters threshold', () => {
  const rule = passRuleLowerCase(0)

  it(`should allow password: "password"`, () => expect(rule('password').status).toBe(RuleResultStatus.PASS))
  it(`should allow password: "Password"`, () => expect(rule('Password').status).toBe(RuleResultStatus.PASS))
  it(`should allow password: "pASSWORD"`, () => expect(rule('pASSWORD').status).toBe(RuleResultStatus.PASS))
  it(`should allow password: "PASSWORD"`, () => expect(rule('PASSWORD').status).toBe(RuleResultStatus.PASS))
})

describe('At least one (1) lower case character (using default)', () => {
  const rule = passRuleLowerCase()

  it(`should allow password: "password"`, () => expect(rule('password').status).toBe(RuleResultStatus.PASS))
  it(`should allow password: "Password"`, () => expect(rule('Password').status).toBe(RuleResultStatus.PASS))
  it(`should allow password: "pASSWORD"`, () => expect(rule('pASSWORD').status).toBe(RuleResultStatus.PASS))
  it(`should deny password: "PASSWORD"`, () => testInsufficientMatchingCharsFail(rule('PASSWORD'), 1, 0))
})

describe('At least two (2) lower case character', () => {
  const rule = passRuleLowerCase(2)

  it(`should allow password: "password"`, () => expect(rule('password').status).toBe(RuleResultStatus.PASS))
  it(`should allow password: "Password"`, () => expect(rule('Password').status).toBe(RuleResultStatus.PASS))
  it(`should deny password: "pASSWORD"`, () => testInsufficientMatchingCharsFail(rule('pASSWORD'), 2, 1))
  it(`should deny password: "PASSWORD"`, () => testInsufficientMatchingCharsFail(rule('PASSWORD'), 2, 0))
})

function testInsufficientMatchingCharsFail(ruleResult: HofReturnType<typeof passRuleLowerCase>, expectedThreshold: number, expectedFound: number) {
  expect(ruleResult.status).toBe(RuleResultStatus.FAIL)
  if (ruleResult.status !== RuleResultStatus.FAIL) return

  expect(ruleResult.info.code).toBe(RuleLowerCaseFailCode.INSUFFICIENT_MATCHING_CHARS)
  expect(ruleResult.info.meta.expected).toBe(expectedThreshold)
  expect(ruleResult.info.meta.found).toBe(expectedFound)
}
