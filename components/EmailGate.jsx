"use client"
export default function EmailGate() {
  // Corrupted original component replaced with a harmless stub to avoid parse errors.
  return null
}

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2">
                  <span className="text-sm">Rating</span>
                  <select value={rating} onChange={(e) => setRating(e.target.value)} className="ml-2 px-2 py-1 border rounded">
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                  </select>
                </label>
              </div>

              {status?.error && <div className="text-red-600 text-sm">{status.error}</div>}
              {status?.ok && <div className="text-green-700 text-sm">{status.ok}</div>}

              <div className="flex gap-2">
                <button type="submit" disabled={loading} className="bg-[#9b1c20] text-white px-4 py-2 rounded flex-1">{loading ? 'Submitting...' : 'Submit'}</button>
                <button type="button" onClick={handleSkip} className="border px-4 py-2 rounded">Sign in</button>
              </div>

              <p className="text-xs text-gray-500">We will use your email only to reply to your feedback. No email or PII is stored in the browser.</p>
            </form>
          </div>
        )
      }
              </label>

              <label className="block">
                <span className="text-sm font-medium">Email (required)</span>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded" placeholder="you@company.com" />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-sm font-medium">Product (optional)</span>
                <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded" placeholder="e.g. Motor Insurance" />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Category</span>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded">
                  <option>Feedback</option>
                  <option>Bug</option>
                  <option>Claim</option>
                  <option>Request a Quote</option>
                  <option>Other</option>
                </select>
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium">Message / details</span>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="mt-1 w-full px-3 py-2 border rounded" placeholder="Tell us more (optional)" />
            </label>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" required className="h-4 w-4" />
                <span className="text-sm">I consent to be contacted regarding this feedback. I understand personal information will not be stored in local storage.</span>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2">
                <span className="text-sm">Rating</span>
                <select value={rating} onChange={(e) => setRating(e.target.value)} className="ml-2 px-2 py-1 border rounded">
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                </select>
              </label>
            </div>

            {status?.error && <div className="text-red-600 text-sm">{status.error}</div>}
            {status?.ok && <div className="text-green-700 text-sm">{status.ok}</div>}

            <div className="flex gap-2">
              <button type="submit" disabled={loading} className="bg-[#9b1c20] text-white px-4 py-2 rounded flex-1">{loading ? 'Submitting...' : 'Submit'}</button>
              <button type="button" onClick={handleSkip} className="border px-4 py-2 rounded">Sign in</button>
            </div>

            <p className="text-xs text-gray-500">We will use your email only to reply to your feedback. No email or PII is stored in the browser.</p>
          </form>
        </div>
      )
    }
          </div>
