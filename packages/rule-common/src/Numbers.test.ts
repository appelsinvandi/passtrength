import { RuleResultStatus } from '@passtrength/core'
import { HofReturnType } from 'types/helpers'
import { passRuleNumbers, RuleNumbersFailCode } from './Numbers'

describe('Password with at least zero (0) numbers', () => {
  const rule = passRuleNumbers(0)

  it('should deny password: "password"', () => expect(rule('password1').status).toBe(RuleResultStatus.PASS))
  it('should allow password: "password1"', () => expect(rule('password1').status).toBe(RuleResultStatus.PASS))
  it('should allow password: "password12"', () => expect(rule('password12').status).toBe(RuleResultStatus.PASS))
  it('should allow password: "password123"', () => expect(rule('password123').status).toBe(RuleResultStatus.PASS))
})

describe('Password with at least one (1) number (using default)', () => {
  const rule = passRuleNumbers()

  it('should deny password: "password"', () => testInsufficientNumbersFail(rule('password'), 1, 0))
  it('should allow password: "password1"', () => expect(rule('password1').status).toBe(RuleResultStatus.PASS))
  it('should allow password: "password12"', () => expect(rule('password12').status).toBe(RuleResultStatus.PASS))
  it('should allow password: "password123"', () => expect(rule('password123').status).toBe(RuleResultStatus.PASS))
})

describe('Password with at least two (2) number', () => {
  const rule = passRuleNumbers(2)

  it('should deny password: "password"', () => testInsufficientNumbersFail(rule('password'), 2, 0))
  it('should deny password: "password1"', () => testInsufficientNumbersFail(rule('password1'), 2, 1))
  it('should allow password: "password12"', () => expect(rule('password12').status).toBe(RuleResultStatus.PASS))
  it('should allow password: "password123"', () => expect(rule('password123').status).toBe(RuleResultStatus.PASS))
})

function testInsufficientNumbersFail(ruleResult: HofReturnType<typeof passRuleNumbers>, expectedThreshold: number, expectedFound: number) {
  expect(ruleResult.status).toBe(RuleResultStatus.FAIL)
  if (ruleResult.status !== RuleResultStatus.FAIL) return

  expect(ruleResult.info.code).toBe(RuleNumbersFailCode.INSUFFICIENT_NUMBERS)
  expect(ruleResult.info.meta.expected).toBe(expectedThreshold)
  expect(ruleResult.info.meta.found).toBe(expectedFound)
}
