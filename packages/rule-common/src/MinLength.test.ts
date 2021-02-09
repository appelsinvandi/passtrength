import { RuleResultStatus } from '@passtrength/core'
import { HofReturnType } from 'types/helpers'
import { passRuleMinLength, RuleMinLengthFailCode } from './MinLength'

describe('Min password length: 8', () => {
  const rule = passRuleMinLength(8)

  it('should deny 6 character password', () => testTooShortFail(rule('a'.repeat(6)), 8, 6))
  it('should allow 8 character password', () => expect(rule('a'.repeat(8)).status).toBe(RuleResultStatus.PASS))
  it('should allow 10 character password', () => expect(rule('a'.repeat(10)).status).toBe(RuleResultStatus.PASS))
})

function testTooShortFail(ruleResult: HofReturnType<typeof passRuleMinLength>, expectedThreshold: number, expectedFound: number) {
  expect(ruleResult.status).toBe(RuleResultStatus.FAIL)
  if (ruleResult.status !== RuleResultStatus.FAIL) return

  expect(ruleResult.info.code).toBe(RuleMinLengthFailCode.TOO_SHORT)
  expect(ruleResult.info.meta.expected).toBe(expectedThreshold)
  expect(ruleResult.info.meta.found).toBe(expectedFound)
}
