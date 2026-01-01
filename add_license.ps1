$repos = Get-Content repos.txt
$licenseContent = @"
MIT License

Copyright (c) 2026 Raphasha27

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"@

# Base64 encode the license content
$Bytes = [System.Text.Encoding]::UTF8.GetBytes($licenseContent)
$EncodedContent = [Convert]::ToBase64String($Bytes)

foreach ($repo in $repos) {
    if ($repo -eq "") { continue }
    Write-Host "Adding MIT License to $repo..."
    # Check if LICENSE already exists
    $exists = gh api "repos/Raphasha27/$repo/contents/LICENSE" --silent 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "LICENSE already exists in $repo, skipping."
        continue
    }
    
    gh api -X PUT "repos/Raphasha27/$repo/contents/LICENSE" `
      -f message="Add MIT License" `
      -f content="$EncodedContent" `
      --silent
}
