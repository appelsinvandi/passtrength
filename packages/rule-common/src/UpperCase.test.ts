import { RuleResultStatus } from '@passtrength/core'
import { HofReturnType } from 'types/helpers'
import { passRuleUpperCase, RuleUpperCaseFailCode } from './UpperCase'

describe('Support using zero (0) upper case characters threshold', () => {
  const rule = passRuleUpperCase(0)

  it(`should allow password: "password"`, () => expect(rule('password').status).toBe(RuleResultStatus.PASS))
  it(`should allow password: "Password"`, () => expect(rule('Password').status).toBe(RuleResultStatus.PASS))
  it(`should allow password: "pASSWORD"`, () => expect(rule('pASSWORD').status).toBe(RuleResultStatus.PASS))
  it(`should allow password: "PASSWORD"`, () => expect(rule('PASSWORD').status).toBe(RuleResultStatus.PASS))
})

describe('At least one (1) upper case character (using default)', () => {
  const rule = passRuleUpperCase()

  it(`should deny password: "password"`, () => testInsufficientMatchingCharsFail(rule('password'), 1, 0))
  it(`should allow password: "Password"`, () => expect(rule('Password').status).toBe(RuleResultStatus.PASS))
  it(`should allow password: "pASSWORD"`, () => expect(rule('pASSWORD').status).toBe(RuleResultStatus.PASS))
  it(`should allow password: "PASSWORD"`, () => expect(rule('PASSWORD').status).toBe(RuleResultStatus.PASS))
})

describe('At least two (2) upper case character', () => {
  const rule = passRuleUpperCase(2)

  it(`should deny password: "password"`, () => testInsufficientMatchingCharsFail(rule('password'), 2, 0))
  it(`should deny password: "Password"`, () => testInsufficientMatchingCharsFail(rule('Password'), 2, 1))
  it(`should allow password: "pASSWORD"`, () => expect(rule('pASSWORD').status).toBe(RuleResultStatus.PASS))
  it(`should allow password: "PASSWORD"`, () => expect(rule('PASSWORD').status).toBe(RuleResultStatus.PASS))
})

function testInsufficientMatchingCharsFail(
  ruleResult: HofReturnType<typeof passRuleUpperCase>,
  expectedThreshold: number,
  expectedFound: number
) {
  expect(ruleResult.status).toBe(RuleResultStatus.FAIL)
  if (ruleResult.status !== RuleResultStatus.FAIL) return

  expect(ruleResult.info.code).toBe(RuleUpperCaseFailCode.INSUFFICIENT_MATCHING_CHARS)
  expect(ruleResult.info.meta.expected).toBe(expectedThreshold)
  expect(ruleResult.info.meta.found).toBe(expectedFound)
}
