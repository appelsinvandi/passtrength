import { RuleResultStatus } from '@passtrength/core'
import { HofReturnType } from 'types/helpers'
import { passRuleNonStandardCharacters, RuleNonStandardCharactersFailCode } from './NonStandardCharacters'

describe('Password with at least zero (0) non-standard', () => {
  const rule = passRuleNonStandardCharacters(0)

  it('should allow password: password', () => expect(rule('password').status).toBe(RuleResultStatus.PASS))
  it('should allow password: p@ssword', () => expect(rule('p@ssword').status).toBe(RuleResultStatus.PASS))
  it('should allow password: p@55word', () => expect(rule('p@55word').status).toBe(RuleResultStatus.PASS))
  it('should allow password: p@55wo_d', () => expect(rule('p@55wo_d').status).toBe(RuleResultStatus.PASS))
})

describe('Password with at least one (1) non-standard (using default)', () => {
  const rule = passRuleNonStandardCharacters()

  it('should deny password: password', () => testInsufficientMatchingCharsFail(rule('password'), 1, 0))
  it('should allow password: p@ssword', () => expect(rule('p@ssword').status).toBe(RuleResultStatus.PASS))
  it('should allow password: p@55word', () => expect(rule('p@55word').status).toBe(RuleResultStatus.PASS))
  it('should allow password: p@55wo_d', () => expect(rule('p@55wo_d').status).toBe(RuleResultStatus.PASS))
})

describe('Password with at least two (2) non-standard', () => {
  const rule = passRuleNonStandardCharacters(2)

  it('should deny password: password', () => testInsufficientMatchingCharsFail(rule('password'), 2, 0))
  it('should deny password: p@ssword', () => testInsufficientMatchingCharsFail(rule('p@ssword'), 2, 1))
  it('should deny password: p@55word', () => testInsufficientMatchingCharsFail(rule('p@55word'), 2, 1))
  it('should allow password: p@55wo_d', () => expect(rule('p@55wo_d').status).toBe(RuleResultStatus.PASS))
})

function testInsufficientMatchingCharsFail(ruleResult: HofReturnType<typeof passRuleNonStandardCharacters>, expectedThreshold: number, expectedFound: number) {
  expect(ruleResult.status).toBe(RuleResultStatus.FAIL)
  if (ruleResult.status !== RuleResultStatus.FAIL) return

  expect(ruleResult.info.code).toBe(RuleNonStandardCharactersFailCode.INSUFFICIENT_MATCHING_CHARS)
  expect(ruleResult.info.meta.expected).toBe(expectedThreshold)
  expect(ruleResult.info.meta.found).toBe(expectedFound)
}
